using FluentValidation;
using MediatR;
using System.Reflection;

namespace DVLD.Server.Common.Extensions
{
    public static class MediatrExtensions
    {
        public static MediatRServiceConfiguration AddPipelineValidationFromAssembly(this MediatRServiceConfiguration config, Assembly assembly)
        {
            var abstractValidatorType = typeof(AbstractValidator<>);
            var requestGenericType = typeof(IRequest<>);
            var validators = assembly
                    .GetTypes()
                    .Where(type =>
                        type.BaseType != null &&
                        type.BaseType.IsGenericType &&
                        type.BaseType.GetGenericTypeDefinition() == abstractValidatorType &&
                        type.BaseType.GetGenericArguments().FirstOrDefault()?.GetInterfaces()
                            .Any(i =>
                                i.IsGenericType &&
                                i.GetGenericTypeDefinition() == requestGenericType &&
                                i.GetGenericArguments().FirstOrDefault() != null)
                            == true)
                    .Select(type => type.BaseType?.GetGenericArguments().FirstOrDefault())
                    .Where(type => type != null)
                    .ToList();
            var returnType = validators.Select(type => type?.GetInterfaces()
                    .FirstOrDefault(i => i.IsGenericType && i.GetGenericTypeDefinition() == requestGenericType)
                    ?.GetGenericArguments().FirstOrDefault())
                    .Where(type => type != null)
                    .ToList();

            for (var i = 0; i < returnType.Count; i++)
            {
                var addValidationMethod = typeof(ValidationExtensions)
                    .GetMethod("AddValidation")
                    ?.MakeGenericMethod(validators[i]!, returnType[i]!);

                config = (MediatRServiceConfiguration)addValidationMethod?.Invoke(null, new object[] { config })!;
            }

            return config;
        }
    }
}
