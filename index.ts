import fastify from "fastify";

const app = fastify({
	logger: true
});

app.get("/", async (request, reply) => {
	return { hello: "world" };
});

try {
	app.listen({ port: 3000 });
} catch(e) {
	app.log.error(e);
	process.exit(1);
}