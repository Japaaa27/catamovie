import { type Movie, type InsertMovie } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllMovies(): Promise<Movie[]>;
  getMovie(id: string): Promise<Movie | undefined>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  deleteMovie(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private movies: Map<string, Movie>;

  constructor() {
    this.movies = new Map();
    this.seedMovies();
  }

  private seedMovies() {
    const sampleMovies: InsertMovie[] = [
      {
        title: "A Origem",
        year: 2010,
        genre: "Ficção Científica",
        synopsis: "Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.",
      },
      {
        title: "O Poderoso Chefão",
        year: 1972,
        genre: "Drama",
        synopsis: "O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        genre: "Drama",
        synopsis: "As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e dois bandidos se entrelaçam em quatro histórias de violência e redenção.",
      },
      {
        title: "Clube da Luta",
        year: 1999,
        genre: "Drama",
        synopsis: "Um funcionário de escritório insone e um fabricante de sabão formam um clube de luta clandestino que evolui para algo muito mais.",
      },
      {
        title: "Matrix",
        year: 1999,
        genre: "Ficção Científica",
        synopsis: "Um hacker descobre que a realidade que conhece é uma simulação criada por máquinas inteligentes e se junta à resistência contra elas.",
      },
      {
        title: "Interestelar",
        year: 2014,
        genre: "Ficção Científica",
        synopsis: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.",
      },
    ];

    sampleMovies.forEach((movie) => {
      const id = randomUUID();
      this.movies.set(id, { ...movie, id });
    });
  }

  async getAllMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values()).sort((a, b) => 
      a.title.localeCompare(b.title)
    );
  }

  async getMovie(id: string): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const id = randomUUID();
    const movie: Movie = { ...insertMovie, id };
    this.movies.set(id, movie);
    return movie;
  }

  async deleteMovie(id: string): Promise<boolean> {
    return this.movies.delete(id);
  }
}

export const storage = new MemStorage();
