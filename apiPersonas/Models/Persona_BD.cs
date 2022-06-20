using System.ComponentModel.DataAnnotations;

namespace apiPersonas.Models
{
    public class Persona_BD
    {
        [Key]
        public int id { get; set; }
        public string rut { get; set; }
        public string nombre { get; set; }
        public string apellidos { get; set; }
        public int edad { get; set; }
        public string email { get; set; }
    }
}
