import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Movie } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Film, Plus, Trash2, Edit, Star } from "lucide-react";

const genres = ["Ação", "Comédia", "Drama", "Ficção Científica", "Terror", "Romance", "Suspense", "Animação"];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({ title: "", year: 2024, genre: "", synopsis: "", rating: 0, posterUrl: "" });
  const { toast } = useToast();

  const { data: movies = [], isLoading } = useQuery<Movie[]>({ queryKey: ["/api/movies"] });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/movies", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({ title: "Filme adicionado!" });
      setIsOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => apiRequest("PUT", `/api/movies/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({ title: "Filme atualizado!" });
      setIsOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/movies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({ title: "Filme removido!" });
    },
  });

  const resetForm = () => {
    setFormData({ title: "", year: 2024, genre: "", synopsis: "", rating: 0, posterUrl: "" });
    setEditing(null);
  };

  const openAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const openEdit = (movie: Movie) => {
    setEditing(movie);
    setFormData({
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      synopsis: movie.synopsis,
      rating: movie.rating || 0,
      posterUrl: movie.posterUrl || "",
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">CataMovie</h1>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd} data-testid="button-add-movie">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Filme
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-add-movie">
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Filme" : "Adicionar Filme"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Ano</label>
                    <Input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      required
                      data-testid="input-year"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gênero</label>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      required
                      data-testid="select-genre"
                    >
                      <option value="">Selecione</option>
                      {genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Sinopse</label>
                  <Textarea
                    value={formData.synopsis}
                    onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                    required
                    data-testid="textarea-synopsis"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Avaliação (0-5)</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="text-2xl"
                      >
                        {star <= formData.rating ? "⭐" : "☆"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">URL do Pôster (opcional)</label>
                  <Input
                    value={formData.posterUrl}
                    onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                    data-testid="input-posterUrl"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-submit">
                  {editing ? "Salvar" : "Adicionar"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <Film className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Nenhum filme no catálogo</h2>
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Filme
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Card key={movie.id} className="group relative overflow-hidden hover-elevate" data-testid={`card-movie-${movie.id}`}>
                <div className="aspect-[2/3] relative">
                  {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                      <Film className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-16">
                    {movie.rating && movie.rating > 0 && (
                      <div className="flex gap-0.5 mb-2 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < (movie.rating || 0) ? "⭐" : "☆"}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="font-semibold text-white line-clamp-2 mb-1">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.genre}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => openEdit(movie)}
                      data-testid={`button-edit-${movie.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(movie.id)}
                      data-testid={`button-delete-${movie.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
