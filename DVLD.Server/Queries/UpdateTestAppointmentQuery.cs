﻿using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;

public record UpdateTestAppointmentQuery(UpdateAppointmentRequest TestRequest) : IRequest<bool>;