import fastify from "fastify";
import baseRoute from "./routes";
import fastifyView from "@fastify/view";
import Mustache from "mustache";
import http from "http";

const app = fastify({
	logger: true,
	serverFactory: http.createServer
});

app.register(fastifyView, {
	engine: {
		mustache: Mustache
	}
});

app.register(baseRoute);

try {
	app.listen({ port: 8080, host: "0.0.0.0" });
} catch(e) {
	app.log.error(e);
	process.exit(1);
}