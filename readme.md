But principal :

Construire des middlewares pour gérer :

1. Vérification de rôle (admin, author, reader)
2. Vérification d’appartenance (un utilisateur peut modifier uniquement ses propres posts)
3. Validation de données (schéma avec  Zod)
4. Contrôle de publication (ex : un reader ne voit que les posts published)

---

Structure des données :

User

id, name, email, role // 'admin' | 'author' | 'reader'


Post

id, title, content, status, userId
// status: 'draft' | 'pending' | 'published'


---

Routes à implémenter :

Public

* GET /posts : liste des posts visibles publiquement (filtrés via middleware)

Authenticated

* GET /me/posts : l’auteur voit tous ses posts, même en brouillon
* POST /posts : créer un post (author)
* PUT /posts/:id : modifier un post (author)
* DELETE /posts/:id : supprimer un post (admin ou owner)

Admin uniquement

* GET /admin/posts/pending : voir tous les posts pending
* PUT /admin/posts/:id/publish : publier un post