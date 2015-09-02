var intervalFire;
var intervalCascada;

function drawParticles(){
	var canvas = document.getElementById("canvasPresentation");
	var ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

	var particles = [];
	var blueParticles = [];

	var particle_count = 90;
	var blueParticle_count = 200;



	for(var i = 0; i < particle_count; i++)
	{
		particles.push(new particle());

	}

	for(var i = 0; i < blueParticle_count; i++)
	{
        blueParticles.push(new blueParticle());

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

	function blueParticle()
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
		ctx.clearRect(0, 0, canvas.width/2.5, canvas.height);

        for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
            ctx.beginPath();

            p.opacity = Math.round(p.remaining_life/p.life*100)/100

            var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);

            gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");

            ctx.fillStyle = gradient;

			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);

            ctx.fill();

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

	function drawBlueParticle()
	{
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "black";
		ctx.fillRect(canvas.width/2.5, 0, canvas.width/2.5, canvas.height);
		ctx.globalCompositeOperation = "lighter";

		for(var i = 0; i < blueParticles.length; i++)
		{
			var c = blueParticles[i];
			ctx.beginPath();
			c.opacity = Math.round(c.remaining_life/c.life*100)/100

			var blueParticleGradient = ctx.createRadialGradient(c.location.x, c.location.y, 0, c.location.x, c.location.y, c.radius);
            blueParticleGradient.addColorStop(0, "rgba("+c.r+", "+c.g+", "+c.b+", "+c.opacity+")");
            blueParticleGradient.addColorStop(0.5, "rgba("+c.r+", "+c.g+", "+c.b+", "+c.opacity+")");
            blueParticleGradient.addColorStop(1, "rgba("+c.r+", "+c.g+", "+c.b+", 0)");
			ctx.fillStyle = blueParticleGradient;
			ctx.arc(c.location.x, c.location.y, c.radius, Math.PI*2, false);
			ctx.fill();

			c.remaining_life--;
			c.radius--;
			c.location.x += c.speed.x;
			c.location.y += c.speed.y;

			if(c.remaining_life < 0 || c.radius < 0)
			{
				blueParticles[i] = new blueParticle();
			}
		}
	}
	intervalFire = setInterval(draw, 33);
	intervalCascada = setInterval(drawBlueParticle, 33);
}

function stopParticles() {
    clearInterval(intervalFire);
    clearInterval(intervalCascada);
}
