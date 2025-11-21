import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Movie, type InsertMovie } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Film, Plus, Search, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMovieSchema } from "@shared/schema";

const genres = [
  "Ação",
  "Aventura",
  "Comédia",
  "Drama",
  "Ficção Científica",
  "Terror",
  "Romance",
  "Suspense",
  "Animação",
  "Documentário",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: movies = [], isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const form = useForm<InsertMovie>({
    resolver: zodResolver(insertMovieSchema),
    defaultValues: {
      title: "",
      year: new Date().getFullYear(),
      genre: "",
      synopsis: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertMovie) => {
      return await apiRequest("POST", "/api/movies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({
        title: "Filme adicionado!",
        description: "O filme foi adicionado ao catálogo com sucesso.",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar filme",
        description: "Ocorreu um erro ao adicionar o filme. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/movies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({
        title: "Filme removido",
        description: "O filme foi removido do catálogo.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao remover filme",
        description: "Ocorreu um erro ao remover o filme. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: InsertMovie) => {
    createMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" data-testid="icon-logo" />
            <h1 className="text-xl font-bold text-foreground" data-testid="text-app-title">
              CataMovie
            </h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar filmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-movie">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Filme
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl" data-testid="dialog-add-movie">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Filme</DialogTitle>
                <DialogDescription>
                  Preencha as informações do filme para adicionar ao catálogo.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: A Origem" 
                            {...field} 
                            data-testid="input-title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2024"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              data-testid="input-year"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="genre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gênero</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-genre">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {genres.map((genre) => (
                                <SelectItem 
                                  key={genre} 
                                  value={genre}
                                  data-testid={`select-genre-${genre.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {genre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="synopsis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sinopse</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Uma breve descrição do filme..."
                            className="resize-none min-h-[100px]"
                            {...field}
                            data-testid="textarea-synopsis"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={createMutation.isPending}
                      data-testid="button-cancel"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createMutation.isPending}
                      data-testid="button-submit"
                    >
                      {createMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Adicionando...
                        </>
                      ) : (
                        "Adicionar Filme"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {searchQuery && (
          <p className="text-sm text-muted-foreground mb-4" data-testid="text-search-results">
            {filteredMovies.length} {filteredMovies.length === 1 ? "resultado" : "resultados"} para "{searchQuery}"
          </p>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Carregando filmes...</p>
            </div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Film className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold" data-testid="text-empty-title">
                {searchQuery ? "Nenhum filme encontrado" : "Nenhum filme no catálogo"}
              </h2>
              <p className="text-muted-foreground max-w-md" data-testid="text-empty-description">
                {searchQuery
                  ? "Tente buscar com outros termos"
                  : "Comece adicionando seu primeiro filme ao catálogo"}
              </p>
            </div>
            {!searchQuery && (
              <Button onClick={() => setIsDialogOpen(true)} data-testid="button-add-first-movie">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Filme
              </Button>
            )}
          </div>
        ) : (
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            data-testid="grid-movies"
          >
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="group relative overflow-hidden transition-all hover-elevate active-elevate-2"
                data-testid={`card-movie-${movie.id}`}
              >
                <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 via-accent/20 to-muted flex items-center justify-center relative">
                  <Film className="h-16 w-16 text-muted-foreground/30" />
                  
                  {/* Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 pt-16">
                    <h3 className="font-semibold text-white line-clamp-2 mb-1" data-testid={`text-movie-title-${movie.id}`}>
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span data-testid={`text-movie-year-${movie.id}`}>{movie.year}</span>
                      <span>•</span>
                      <span data-testid={`text-movie-genre-${movie.id}`}>{movie.genre}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteMutation.mutate(movie.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${movie.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Synopsis on hover - shown as tooltip-like overlay */}
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                  <h3 className="font-semibold mb-2" data-testid={`text-movie-title-hover-${movie.id}`}>
                    {movie.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {movie.year} • {movie.genre}
                  </p>
                  <p className="text-sm line-clamp-6 flex-1" data-testid={`text-movie-synopsis-${movie.id}`}>
                    {movie.synopsis}
                  </p>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="mt-4"
                    onClick={() => deleteMutation.mutate(movie.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-hover-${movie.id}`}
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Remover
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>CataMovie © {new Date().getFullYear()} - Seu catálogo pessoal de filmes</p>
        </div>
      </footer>
    </div>
  );
}
