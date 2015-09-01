var intervalFire;
var intervalCascada;

function drawParticles(){
	var canvas = document.getElementById("canvasPresentation");
	var ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

	var particles = [];
	var cascadas = [];

	var particle_count = 90;
	var cascada_count = 200;



	for(var i = 0; i < particle_count; i++)
	{
		particles.push(new particle());

	}

	for(var i = 0; i < cascada_count; i++)
	{
		cascadas.push(new cascada());

	}




	function particle()
	{
		this.speed = {x: -2.5 + Math.random() * 5, y: - 15 + Math.random() * 10};

		this.location = {x: canvas.width/4, y: canvas.height/2};

		this.radius = 10+Math.random()*20;

		this.life = 20+Math.random()*10;
		this.remaining_life = this.life;

		this.r = Math.round(Math.random()*255);
		this.g = Math.round(Math.random()*40);
		this.b = 0;
	}

	function cascada()
	{

		this.speed = {x: Math.floor(Math.random() * 10) - 5, y: Math.floor(Math.random() * 20) - 10};

		this.location = {x: canvas.width/2 , y: canvas.height/3};

		this.radius = 20+Math.random()*20;

		this.life = 20+Math.random()*15;
		this.remaining_life = this.life;

		this.r = 0;
		this.g = Math.round(Math.random()*100);
		this.b = Math.round(Math.random()*255);
	}

	function draw()
	{
        //Limpiamos el canvas
		ctx.clearRect(0, 0, canvas.width/2.5, canvas.height);

        for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
			//beginPath se usa para iniciar o reiniciar el el camino actual de lo que estemos dibujando
          ctx.beginPath();

			//Logica para que las particulas se vayan "desvaneciendo"
            p.opacity = Math.round(p.remaining_life/p.life*100)/100

            //createRadialGradient es para crear un degrade de colores en forma circular
            var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);

            /*
             addColorStop sirve para realizar el cambio de color en un punto determinado de la forma circular
             Siendo 0 el valor mas cercano al centro y 1 el mas lejano
            */
            gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");

            //fillStyle se usa para actualizar el color de la particula
            ctx.fillStyle = gradient;

            //arc se utiliza para darle la forma circular a la particula
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);

            //fill se encarga de dibujar en base a lo setteado anteriorment
            ctx.fill();

            //Logica de las particulas
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;

            //Cuando muere la particula generamos una nueva
			if(p.remaining_life < 0 || p.radius < 0)
			{
				particles[i] = new particle();
			}
		}
	}

	function drawCascada()
	{
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "black";
		ctx.fillRect(canvas.width/2.5, 0, canvas.width/2.5, canvas.height);
		ctx.globalCompositeOperation = "lighter";

		for(var i = 0; i < cascadas.length; i++)
		{
			var c = cascadas[i];
			ctx.beginPath();
			c.opacity = Math.round(c.remaining_life/c.life*100)/100

			var gradientCascada = ctx.createRadialGradient(c.location.x, c.location.y, 0, c.location.x, c.location.y, c.radius);
			gradientCascada.addColorStop(0, "rgba("+c.r+", "+c.g+", "+c.b+", "+c.opacity+")");
			gradientCascada.addColorStop(0.5, "rgba("+c.r+", "+c.g+", "+c.b+", "+c.opacity+")");
			gradientCascada.addColorStop(1, "rgba("+c.r+", "+c.g+", "+c.b+", 0)");
			ctx.fillStyle = gradientCascada;
			ctx.arc(c.location.x, c.location.y, c.radius, Math.PI*2, false);
			ctx.fill();

			c.remaining_life--;
			c.radius--;
			c.location.x += c.speed.x;
			c.location.y += c.speed.y;

			if(c.remaining_life < 0 || c.radius < 0)
			{
				cascadas[i] = new cascada();
			}
		}
	}
	intervalFire = setInterval(draw, 33);
	intervalCascada = setInterval(drawCascada, 33);
}

function stopParticles() {
    clearInterval(intervalFire);
    clearInterval(intervalCascada);
}
