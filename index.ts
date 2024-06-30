import fastify from "fastify";
import baseRoute from "./routes";
import fastifyView from "@fastify/view";
import { createServer } from "http";
import { Eta } from "eta";

const app = fastify({
	logger: true,
	serverFactory: createServer
});

export type ServerApp = typeof app;

app.register(fastifyView, {
	layout: "base/index.html",
	root: "web/",
	engine: { eta: new Eta() }
});

app.register(baseRoute);

try {
	app.listen({ port: 8080, host: "0.0.0.0" });
} catch(e) {
	app.log.error(e);
	process.exit(1);
}