using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers
{
    public class UpdatePersonHandler : BaseHandler<UpdatePersonHandler>, IRequestHandler<UpdatePersonQuery, bool>
    {
        public UpdatePersonHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdatePersonHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<bool> Handle(UpdatePersonQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var entity = _mapper.Map<Person>(request.Person);
                var isValid = await _unitOfWork.PersonRepository.UpdatePerson(entity);
                if (!isValid)
                    return false;
                await _unitOfWork.CompleteAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"UpdatePersonHandler // {ex.Message}", ex);
            }
            
            return true;
        }
    }
}
