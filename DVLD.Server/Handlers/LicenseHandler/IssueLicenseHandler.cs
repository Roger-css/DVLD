using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler
{
    public class IssueLicenseHandler : BaseHandler<IssueLicenseHandler>, IRequestHandler<IssueLicenseCommand, int>
    {
        public IssueLicenseHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<IssueLicenseHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<int> Handle(IssueLicenseCommand query, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.ApplicationRepository.CompleteApplication(query.request.ApplicationId);
                var person = await _unitOfWork.ApplicationRepository.GetPerson(query.request.ApplicationId);
                if (person is null)
                    throw new NullReferenceException();
                if (person.Driver is not null)
                {
                    var license = await _unitOfWork.LicenseRepository
                        .IssueLicenceFirstTime(query.request, person.Driver.Id);
                    await _unitOfWork.CompleteAsync();
                    return license.Id;
                }
                else
                {
                    var driver = new Driver()
                    {
                        CreatedAt = DateTime.UtcNow,
                        CreatedByUserId = query.request.CreatedByUserId,
                        PersonId = person.Id,
                    };
                    await _unitOfWork.DriverRepository.Add(driver);
                    await _unitOfWork.CompleteAsync();
                    var license = await _unitOfWork.LicenseRepository
                        .IssueLicenceFirstTime(query.request, driver.Id);
                    await _unitOfWork.CompleteAsync();
                    return license.Id;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex.Message);
                return -1;
            }
        }
    }
}
