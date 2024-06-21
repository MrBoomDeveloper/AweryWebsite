import { FastifyInstance } from "fastify";
import getInternalizationMap from "../util/internalization";

export default async function baseRoute(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		return reply.status(200)
			.view("static/home.html", { i18n: getInternalizationMap(request) });
	});
	
	app.get("*", async (request, reply) => {
		return reply.status(404)
			.view("static/error.html", {
				title: "Page not found",
				code: 404,
				message: "Sorry, but the page you are looking for cannot be found. Please check the URL and try again."
			});
	});
}