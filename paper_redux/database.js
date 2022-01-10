const LZMA_io = require("lzma");
const STO_io = require("fs")
const cli = require("./cli.js");
const chalk = require("chalk")

const defaultInit = {
	reduxVersion: "0.0.1-alpha",
	indexKeys: []
}

const progressAnim = ["|", "/", "-", "\\"]
let counter = 0

toCompress = ""
for (const x of Array(10000).keys()) {
	toCompress += `${JSON.stringify(defaultInit)}\n`
}

class Database {
  constructor(path, json) {
    this.path = path
		this.jsonArgs = json
		this.preFlight()
  }

	// Pre-emptive checks for args and files.
	preFlight = () => {
		cli.log({ level: "info", body: "Checking provided Redux arguments" })
		if ( this.path == null || this.path == undefined )
		{
			throw new Error("No path provided for Redux to modify .rdj file")
		} 
		else if ( this.jsonArgs == null || this.jsonArgs == undefined )
		{
			throw new Error("No JSON parameter provided for Redux")
		}
		cli.log({ level: "more", body: "Checking for file pre-existance" })
		if (STO_io.existsSync(this.path)){
			cli.log({ level: "more", body: `File "${this.path}" exists, importing instead` })
		} 
		else
		{
			cli.log({ level: "more", body: `File "${this.path}" does not exist, creating new Database` })
			try {
				STO_io.writeFileSync(`${this.path}.rjd`, null)
				cli.log({ level: "ok", body: `Database at "${this.path}.rdj" has been created` })
				cli.log({ level: "info", body: `Initialising Database at "${this.path}.rdj"` })
				LZMA_io.compress(toCompress, 9);
				cli.log({ level: "ok", body: `Database at "${this.path}.rdj" is ready` , end:"{{ replace }}"  })
				cli.log({ level: "more", body: `Database at "${this.path}.rdj" is ready` })
			} catch (e) {
				cli.log({ level: "error", body: `Database could not be created` })
				cli.log({ level: "more", body: `${e.stack}` })
			}
		}
	}
}

module.exports = {
	Database: Database
}