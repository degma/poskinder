CREATE TABLE "articulos" (
  "id" int PRIMARY KEY,
  "nombre" varchar,
  "descripcion" varchar,
  "id_fabricante" int,
  "id_art_generos" int,
  "id_categoria" int,
  "tags" varchar[],
  "estado" varchar,
  "fecha_creado" date
);

CREATE TABLE "variantes" (
  "id" int PRIMARY KEY,
  "id_articulo" int,
  "id_talle" int,
  "id_color" int,
  "stock" int
);

CREATE TABLE "movimientos_stock" (
  "id" int PRIMARY KEY,
  "id_variante" int,
  "cantidad" int,
  "usuario" int,
  "fecha" timestamp
);

CREATE TABLE "fabricantes" (
  "id" int PRIMARY KEY,
  "nombre" varchar,
  "telefono" varchar,
  "direccion" varchar,
  "nombre_contacto" varchar
);

CREATE TABLE "generos" (
  "id" int PRIMARY KEY,
  "nombre" varchar,
  "fecha_creado" date,
  "grupo_talle" varchar
);

CREATE TABLE "art_genero" (
  "id" int PRIMARY KEY,
  "id_articulo" int,
  "id_genero" int
);

CREATE TABLE "categorias" (
  "id" int PRIMARY KEY,
  "nombre" varchar,
  "fecha_creado" date,
  id_padre int
);

CREATE TABLE "talles" (
  "id" int PRIMARY KEY,
  "nombre" varchar,
  "grupo_talle" varchar
);

CREATE TABLE "colores" (
  "id" int PRIMARY KEY,
  "nombre" varchar
);

CREATE TABLE "listaprecios" (
  "id" int PRIMARY KEY,
  "nombre" varchar,
  "valida_desde" date,
  "valida_hasta" date,
  "activo" boolean,
  "fecha_creado" datetime
);

CREATE TABLE "precios" (
  "id" int PRIMARY KEY,
  "id_articulo" int,
  "id_listaprecios" int,
  "precio" float,
  "fecha_creado" datetime
);

CREATE TABLE "usuarios" (
  "id" int PRIMARY KEY,
  "full_name" varchar,
  "email" varchar UNIQUE,
  "date_of_birth" varchar,
  "created_at" varchar,
  "admin" boolean
);

ALTER TABLE "articulos" ADD FOREIGN KEY ("id_fabricante") REFERENCES "fabricantes" ("id");

ALTER TABLE "articulos" ADD FOREIGN KEY ("id_art_generos") REFERENCES "art_genero" ("id");

ALTER TABLE "articulos" ADD FOREIGN KEY ("id_categoria") REFERENCES "categorias" ("id");

ALTER TABLE "variantes" ADD FOREIGN KEY ("id_articulo") REFERENCES "articulos" ("id");

ALTER TABLE "variantes" ADD FOREIGN KEY ("id_talle") REFERENCES "talles" ("id");

ALTER TABLE "variantes" ADD FOREIGN KEY ("id_color") REFERENCES "colores" ("id");

ALTER TABLE "movimientos_stock" ADD FOREIGN KEY ("id_variante") REFERENCES "variantes" ("id");

ALTER TABLE "movimientos_stock" ADD FOREIGN KEY ("usuario") REFERENCES "usuarios" ("id");

ALTER TABLE "generos" ADD FOREIGN KEY ("grupo_talle") REFERENCES "talles" ("grupo_talle");

ALTER TABLE "art_genero" ADD FOREIGN KEY ("id_articulo") REFERENCES "articulos" ("id");

ALTER TABLE "art_genero" ADD FOREIGN KEY ("id_genero") REFERENCES "generos" ("id");

ALTER TABLE "precios" ADD FOREIGN KEY ("id_articulo") REFERENCES "articulos" ("id");

ALTER TABLE "precios" ADD FOREIGN KEY ("id_listaprecios") REFERENCES "listaprecios" ("id");