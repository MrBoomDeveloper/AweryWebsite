import fastify, { FastifyRequest } from "fastify";
import * as en from "../static/internalization/en.json";
import * as ru from "../static/internalization/ru.json";

const maps: Record<string, Record<string, string>> = {
	"ru": ru, "ru-RU": ru, "ua": ru, "uk": ru, "uk-UA": ru, "be": ru, "be-BY": ru,
	"default": en
}

export default function getInternalizationMap(request: FastifyRequest): Record<string, string> {
	const locales = request.headers["accept-language"];
	if(locales == null) return en;

	for(const locale of locales.split(",")) {
		if(maps[locale] != null) return maps[locale];
	}

	return en;
}