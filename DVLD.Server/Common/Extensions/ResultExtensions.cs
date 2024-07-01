using FluentResults;

namespace DVLD.Server.Common.Extensions;

public static class ResultExtensions
{
    public static IEnumerable<string> ToErrorMessages<T>(this Result<T> result)
    {
        return result.Reasons.Select(reason => reason.Message);
    }
    public static IEnumerable<string> ToErrorMessages(this Result result)
    {
        return result.Reasons.Select(reason => reason.Message);
    }
}
