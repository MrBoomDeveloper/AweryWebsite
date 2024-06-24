import { FastifyInstance, FastifyRequest } from "fastify";
import getInternalizationMap from "../utils/internalization";
import { readFile, stat } from "fs/promises";
import { ServerApp } from "@/index";

function errorPage(request, reply) {
	return reply.status(404)
		.view("error/index.eta", {
			styles: "/styles/error.css",
			title: "Page not found",
			code: 404,
			description: "Sorry, but the page you are looking for cannot be found. Please check the URL and try again.",
			i18n: getInternalizationMap(request)
		});
}

export default async function baseRoute(app: ServerApp) {
	app.get("/", async (request, reply) => {
		const i18n = getInternalizationMap(request);

		return reply.status(200)
			.view("home/index.eta", { 
				title: i18n.app_slogan,
				description: i18n.app_description,
				styles: "/styles/home.css",
				i18n
			});
	});

	app.get("*", async (request, reply) => {
		return errorPage(request, reply);
	});
	
	app.get("/:file", async (request: FastifyRequest<{ Params: { file: string } }>, reply) => {
		try {
			const stats = await stat("public/" + request.params.file);

			if(stats.isFile()) {
				return reply.status(200)
					.send(await readFile("public/" + request.params.file));
			}
		} catch(e) {
			app.log.error(e);
			return errorPage(request, reply);
		}
	});

	app.get("/styles/:file", async (request: FastifyRequest<{ Params: { file: string } }>, reply) => {
		const name = request.params.file;
		const path = `generated/styles/${name.substring(0, name.lastIndexOf("."))}/styles.css`;

		try {
			return reply.status(200)
				.header("Content-Type", "text/css")
				.send(await readFile(path, "utf8"));
		} catch(e) {
			return reply.status(404)
				.send({ "error_message": `File not found! Tried path: ${path}` });
		}
	});
}