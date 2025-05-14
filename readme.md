API follow

Objectif

Créer une fonction followUser qui permettra à un utilisateur authentifié de suivre un autre utilisateur.

Désormais, nous avons avoir un modèle FollowModel contenant :

* followerId
* followeeId
* dateCreated

Exigences

1. La fonction doit être accessible uniquement aux utilisateurs authentifiés.
2. L'identifiant du suiveur (followerId) doit être automatiquement récupéré à partir de l'utilisateur authentifié.
3. L'identifiant de l'utilisateur à suivre (followeeId) doit être fourni dans le corps de la requête.
4. La fonction doit vérifier si l'utilisateur à suivre existe.
5. La fonction doit vérifier si la relation de suivi n'existe pas déjà.
6. La nouvelle relation de suivi doit être enregistrée dans une base de données.
7. La fonction doit gérer les erreurs appropriées (utilisateur non trouvé, déjà suivi, etc.).
8. La réponse doit renvoyer un statut 204 en cas de succès.