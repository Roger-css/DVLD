
using DVLD.DataService.Data;
using DVLD.DataService.Repositories;
using DVLD.DataService.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DVLD.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddControllers();
            builder.Services.AddDbContext<DvldContext>(x => x.UseSqlServer(connectionString));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblies(typeof(Program).Assembly));
            builder.Services.AddCors(opt => opt.AddPolicy("LocalHost", policy =>
            policy.WithOrigins("https://localhost:5173").AllowAnyHeader().AllowCredentials().AllowAnyMethod()));
            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("LocalHost");

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");
            
            app.Run();
        }
    }
}
