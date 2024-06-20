<p align="center">
  <a href="" rel="noopener">
    <img width=200px height=200px src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F525050889%2F430755355196%2F1%2Foriginal.20230530-103808?w=225&auto=format%2Ccompress&q=75&sharp=10&s=fc18d967ea65d9b045bc052d35e0730e" alt="Project logo">
  </a>
</p>

<h3 align="center">Wildrent</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/WildCodeSchool/2023-09-wns-vert-groupe3/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/WildCodeSchool/2023-09-wns-vert-groupe3/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
  Wildrent est une entreprise de location de matériel spécialisée dans les équipements tels que ski, randonnée, plongée, etc. Pour améliorer son efficacité opérationnelle, elle souhaite introduire une application web intuitive permettant la gestion des réservations et des stocks. Dans la première version, le MVP comprend des fonctionnalités telles que la connexion en tant qu'administrateur, la gestion des références produits et des stocks, la consultation des réservations, la recherche de produits disponibles, ainsi qu'un processus de commande convivial. Les évolutions futures incluent un dashboard avec des KPIs, l'intégration du paiement via Stripe, et une expansion internationale avec la traduction dans plusieurs langues et la gestion de multiples hubs de stockage. Cette initiative vise à soutenir la croissance rapide de l'entreprise, renforcée par une récente levée de fonds.
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Installing](#installing)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This project is a web application for a rental company. It is a school project for the Wild Code School. The goal is to create a web application with a backend and a frontend. The backend is a GraphQL API with a PostgreSQL database. The frontend is a Next.js application with TailwindCSS and Radix UI.s

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system. And see [installation](#installing) for notes on how to install the project on your machine for local development.

### Prerequisites

Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) on your machine.
Install [pnpm](https://pnpm.io/) on your machine.

### Installing <a name = "installing"></a>

#### Check if Docker is installed on your machine:

```bash
docker --version
```

#### Check if Docker Compose is installed on your machine:

```bash
docker compose --version
```

#### Check if pnpm is installed on your machine:

```bash
pnpm --version
```

#### Clone the repository:

```bash
git clone https://github.com/WildCodeSchool/2023-09-wns-vert-groupe3.git
```

#### Go to the project "backend" folder or "frontend" folder:

```bash
cd backend

cd frontend
```

#### Install the dependencies:

```bash
pnpm install
```

---

#### Go to branch `dev` and create a new branch from it:

```bash
git checkout dev

git checkout -b <your-branch-name>
```

---

#### Run the containers:

```bash
docker compose up
```

#### Rebuild the containers and run them :

```bash
docker compose up --build
```

#### Watch applications files changes [and rebuilds on package.json changes] :

(La commande suivante est optionnelle, elle permet de surveiller les changements de fichiers et de reconstruire les conteneurs en cas de changement dans le fichier package.json)

**_[Cependant, si utilisée, il faut la lancer dans un autre terminal que celui où les conteneurs sont lancés (sans le couper) !!]_**

> Bug connu :
> Sur windows, en watch mode, si le conteneur est arrêté et que plus tard on souhaite le relancer avec le watch mode, la commande `docker compose watch` peut renvoyer une erreur de ce type :
>
> ```BASH
> cannot take exclusive lock for project "<project name>": process with PID <pid> is still running
> ```
>
> Pour régler ce problème, supprimer le contenu du dossier `docker-compose` situé dans :
> `C:\Users\<user_name>\AppData\Local\docker-compose`
>
> Ce bug fait déjà l'object d'une issue sur le repo de docker :
> https://github.com/docker/compose/issues/11066

```bash
docker compose watch
```

## 🎈 Usage <a name="usage"></a>

[TO COMPLETE]

## 🚀 Deployment <a name = "deployment"></a>

[TO COMPLETE]

## ⛏️ Built Using <a name = "built_using"></a>

- [Docker](https://www.docker.com/) - Containerization
- [Docker Compose](https://docs.docker.com/compose/) - Containerization
- [GraphQL](https://graphql.org/) - Query Language
- [TypeORM](https://typeorm.io/) - ORM
- [Next.js 13](https://nextjs.org) - Web Framework for frontend
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Radix UI](https://radix-ui.com/) - UI Components
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [TO COMPLETE]
