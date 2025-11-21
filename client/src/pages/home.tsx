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
import { Film, Plus, Trash2, Edit } from "lucide-react";

const genres = ["Ação", "Comédia", "Drama", "Ficção Científica", "Terror", "Romance", "Suspense", "Animação"];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Movie | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2024);
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState(0);
  const [posterUrl, setPosterUrl] = useState("");
  const { toast } = useToast();

  const { data: movies = [], isLoading } = useQuery<Movie[]>({ queryKey: ["/api/movies"] });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/movies", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({ title: "Filme adicionado!" });
      setOpen(false);
      clearForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => apiRequest("PUT", `/api/movies/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({ title: "Filme atualizado!" });
      setOpen(false);
      clearForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/movies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies"] });
      toast({ title: "Filme removido!" });
    },
  });

  const clearForm = () => {
    setTitle("");
    setYear(2024);
    setGenre("");
    setSynopsis("");
    setRating(0);
    setPosterUrl("");
    setEditing(null);
  };

  const handleAdd = () => {
    clearForm();
    setOpen(true);
  };

  const handleEdit = (movie: Movie) => {
    setEditing(movie);
    setTitle(movie.title);
    setYear(movie.year);
    setGenre(movie.genre);
    setSynopsis(movie.synopsis);
    setRating(movie.rating || 0);
    setPosterUrl(movie.posterUrl || "");
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, year, genre, synopsis, rating, posterUrl };
    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">CataMovie</h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} data-testid="button-add-movie">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Filme
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-add-movie">
              <DialogHeader>
                <DialogTitle>{editing ? "Editar Filme" : "Adicionar Filme"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} required data-testid="input-title" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Ano</label>
                    <Input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} required data-testid="input-year" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gênero</label>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
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
                  <Textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required data-testid="textarea-synopsis" />
                </div>
                <div>
                  <label className="text-sm font-medium">Avaliação</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className="text-2xl">
                        {star <= rating ? "⭐" : "☆"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">URL do Pôster (opcional)</label>
                  <Input value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} data-testid="input-posterUrl" />
                </div>
                <Button type="submit" className="w-full" data-testid="button-submit">
                  {editing ? "Salvar" : "Adicionar"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="text-center py-20">
            <p>Carregando...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Nenhum filme</h2>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Filme
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <Card key={movie.id} className="group relative overflow-hidden" data-testid={`card-movie-${movie.id}`}>
                <div className="aspect-[2/3] relative">
                  {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <Film className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3 pt-20">
                    {movie.rating && movie.rating > 0 && (
                      <div className="flex gap-0.5 mb-1 text-xs">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i}>{i <= (movie.rating || 0) ? "⭐" : "☆"}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="font-semibold text-white text-sm mb-1">{movie.title}</h3>
                    <p className="text-xs text-white/80 mb-1">{movie.year} • {movie.genre}</p>
                    <p className="text-xs text-white/70 line-clamp-2">{movie.synopsis}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => handleEdit(movie)}
                      data-testid={`button-edit-${movie.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
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
