using apiPersonas.Context;
using apiPersonas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace apiPersonas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly AppDBContext context;

        public PersonasController(AppDBContext context)
        {
            this.context = context;
        }

        //GET api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(context.persona.ToList());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //GET api/<controller>/5
        [HttpGet("{id}", Name ="GetPersona")]
        public IActionResult Get(int id)
        {
            try
            {
                var person = context.persona.FirstOrDefault(person => person.id == id);
                return Ok(person);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Personas_BD person)
        {
            try
            {
                context.persona.Add(person);
                context.SaveChanges();
                return CreatedAtRoute("GetPersona", new {id = person.id }, person);  
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Personas_BD person)
        {
            try
            {   
                if(person.id == id)
                {
                    context.Entry(person).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetPersona", new { id = person.id }, person);
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var person = context.persona.FirstOrDefault(person => person.id == id);

                if (person.id != null)
                {
                    context.persona.Remove(person);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
