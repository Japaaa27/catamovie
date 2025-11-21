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
import { Film, Plus, Trash2, Loader2, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMovieSchema } from "@shared/schema";
import { StarRating } from "@/components/StarRating";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
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
      rating: 0,
      posterUrl: "",
    },
  });

  const openAddDialog = () => {
    setEditingMovie(null);
    form.reset({
      title: "",
      year: new Date().getFullYear(),
      genre: "",
      synopsis: "",
      rating: 0,
      posterUrl: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (movie: Movie) => {
    setEditingMovie(movie);
    form.reset({
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      synopsis: movie.synopsis,
      rating: movie.rating || 0,
      posterUrl: movie.posterUrl || "",
    });
    setIsDialogOpen(true);
  };

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

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertMovie }) => {
      return await apiRequest("PUT", `/api/movies/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({
        title: "Filme atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
      form.reset();
      setIsDialogOpen(false);
      setEditingMovie(null);
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar filme",
        description: "Ocorreu um erro ao atualizar o filme. Tente novamente.",
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


  const onSubmit = (data: InsertMovie) => {
    if (editingMovie) {
      updateMutation.mutate({ id: editingMovie.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog} data-testid="button-add-movie">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Filme
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl" data-testid="dialog-add-movie">
              <DialogHeader>
                <DialogTitle>
                  {editingMovie ? "Editar Filme" : "Adicionar Novo Filme"}
                </DialogTitle>
                <DialogDescription>
                  {editingMovie
                    ? "Faça as alterações desejadas e clique em salvar."
                    : "Preencha as informações do filme para adicionar ao catálogo."}
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
                            value={field.value}
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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avaliação</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <StarRating
                                rating={field.value || 0}
                                interactive
                                onChange={field.onChange}
                                size="lg"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="posterUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL do Pôster (opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://..."
                              {...field}
                              data-testid="input-poster-url"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isSubmitting}
                      data-testid="button-cancel"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      data-testid="button-submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {editingMovie ? "Salvando..." : "Adicionando..."}
                        </>
                      ) : (
                        editingMovie ? "Salvar Alterações" : "Adicionar Filme"
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
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Carregando filmes...</p>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Film className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold" data-testid="text-empty-title">
                Nenhum filme no catálogo
              </h2>
              <p className="text-muted-foreground max-w-md" data-testid="text-empty-description">
                Comece adicionando seu primeiro filme ao catálogo
              </p>
            </div>
            <Button onClick={openAddDialog} data-testid="button-add-first-movie">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Filme
            </Button>
          </div>
        ) : (
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            data-testid="grid-movies"
          >
            {movies.map((movie) => (
              <Card
                key={movie.id}
                className="group relative overflow-hidden transition-all hover-elevate active-elevate-2"
                data-testid={`card-movie-${movie.id}`}
              >
                <div className="aspect-[2/3] relative">
                  {movie.posterUrl ? (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-poster-${movie.id}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-muted flex items-center justify-center">
                      <Film className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  )}
                  
                  {/* Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 pt-20">
                    {movie.rating !== null && movie.rating > 0 && (
                      <div className="mb-2">
                        <StarRating rating={movie.rating} size="sm" />
                      </div>
                    )}
                    <h3 className="font-semibold text-white line-clamp-2 mb-1" data-testid={`text-movie-title-${movie.id}`}>
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span data-testid={`text-movie-year-${movie.id}`}>{movie.year}</span>
                      <span>•</span>
                      <span data-testid={`text-movie-genre-${movie.id}`}>{movie.genre}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(movie)}
                      data-testid={`button-edit-${movie.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      onClick={() => deleteMutation.mutate(movie.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-${movie.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Synopsis on hover - shown as tooltip-like overlay */}
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                  <h3 className="font-semibold mb-2" data-testid={`text-movie-title-hover-${movie.id}`}>
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-sm text-muted-foreground">
                      {movie.year} • {movie.genre}
                    </p>
                    {movie.rating !== null && movie.rating > 0 && (
                      <StarRating rating={movie.rating} size="sm" />
                    )}
                  </div>
                  <p className="text-sm line-clamp-6 flex-1" data-testid={`text-movie-synopsis-${movie.id}`}>
                    {movie.synopsis}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => openEditDialog(movie)}
                      data-testid={`button-edit-hover-${movie.id}`}
                    >
                      <Edit className="h-3 w-3 mr-2" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => deleteMutation.mutate(movie.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-hover-${movie.id}`}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Remover
                    </Button>
                  </div>
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
