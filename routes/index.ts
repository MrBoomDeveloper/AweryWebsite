import { FastifyInstance, FastifyRequest } from "fastify";
import getInternalizationMap from "../util/internalization";
import { readFile } from "fs/promises";

export default async function baseRoute(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		return reply.status(200)
			.view("web/home/index.html", { i18n: getInternalizationMap(request) });
	});
	
	app.get("*", async (request, reply) => {
		return reply.status(404)
			.view("web/error/index.html", {
				title: "Page not found",
				code: 404,
				message: "Sorry, but the page you are looking for cannot be found. Please check the URL and try again."
			});
	});

	app.get("/styles/:file", async (request: FastifyRequest<{ Params: { file: string } }>, reply) => {
		const name = request.params.file;
		const path = `generated/styles/${name.substring(0, name.lastIndexOf("."))}/styles.css`;

		try {
			return await readFile(path, "utf8");
		} catch(e) {
			return reply.status(404).send({ 
				"error_message": `File not found! Tried path: ${path}`
			});
		}
	});
}