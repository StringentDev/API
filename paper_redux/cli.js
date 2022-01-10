const Chalk = require("chalk")

process.on('SIGINT', () => {
	process.stdout.write("\n")
});

module.exports = new class {
	constructor() {
		this.lsu = null
		this.more = false
	}
	log = (json) => {
		if ( json.level == "ok" )
		{
			this.generated_level = Chalk.white.bgGreen("   ok   ")
		}
		else if ( json.level == "warn" )
		{
			this.generated_level = Chalk.white.bgYellow("  warn  ")
		} 
		else if ( json.level == "error" )
		{
			this.generated_level = Chalk.white.bgRed("  fail  ")
		}
		else if ( json.level == "info" )
		{
			this.generated_level = Chalk.white.bgBlue("  info  ")
		}
		else if ( json.level == "more" )
		{
			this.more = true
			if(	this.lsu == "ok"	)
			{
				this.generated_level = Chalk.green("       ▐")
			}
			else if(	this.lsu == "warn"	)
			{
				this.generated_level = Chalk.yellow("       ▐")
			}
			else if(	this.lsu == "error"	)
			{
				this.generated_level = Chalk.red("       ▐")
			} 
			else if(	this.lsu == "info"	)
			{
				this.generated_level = Chalk.blue("       ▐")
			} 
			else
			{
				this.generated_level = Chalk.white.dim("       ▐")
			}
		}
		else
		{
			this.generated_level = Chalk.black.bgWhite(` ${json.level} `)
		}
		
		if ( json.end == "{{ replace }}" ) 
		{
			this.end = "\r"
		} 
		else if ( json.end == "{{ newline }}" )
		{
			this.end = "\n"
		}
		else if ( json.end != undefined )
		{
			this.end = json.end
		}
		else
		{
			this.end = "\n"
		}

		if ( json.level != "more" ) {
			this.lsu = json.level
			
			if ( this.more )
			{
				process.stdout.write("\n")
				this.more = false
			}
		}
		
		process.stdout.write(`${ this.end }\x1b[K${ this.generated_level } ${ json.body }`)
	}
}