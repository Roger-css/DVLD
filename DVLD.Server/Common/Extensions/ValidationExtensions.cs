using DVLD.Server.Common.Middleware;
using FluentResults;
using MediatR;

namespace DVLD.Server.Common.Extensions
{
    public static class ValidationExtensions
    {
        public static MediatRServiceConfiguration AddValidation<TRequest, TResponse>
            (this MediatRServiceConfiguration config)
            where TRequest : notnull, IRequest<TResponse>
            where TResponse : ResultBase, new()
        {
            return config.AddBehavior<IPipelineBehavior<TRequest, TResponse>,
                ValidationPipeline<TRequest, TResponse>>();
        }
    }
}
