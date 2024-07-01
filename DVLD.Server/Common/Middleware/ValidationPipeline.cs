using FluentResults;
using FluentValidation;
using MediatR;

namespace DVLD.Server.Common.Middleware
{
    public class ValidationPipeline<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
        where TResponse : ResultBase, new()
    {
        private readonly IValidator<TRequest> _validator;
        public ValidationPipeline(IValidator<TRequest> validator)
        {
            _validator = validator;
        }

        public async Task<TResponse> Handle(TRequest request,
            RequestHandlerDelegate<TResponse> _next,
            CancellationToken cancellationToken)
        {
            var IsValid = await _validator.ValidateAsync(request, cancellationToken);
            if (!IsValid.IsValid)
            {
                var result = new TResponse();
                foreach (var err in IsValid.Errors)
                {
                    result.Reasons.Add(new Error(err.ErrorMessage));
                };
                return result;
            }
            return await _next();
        }
    }
}
