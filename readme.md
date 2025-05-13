Ajouter une fonctionnalité de suivi d'utilisateurs à l'API

Objectif

Créer un point de terminaison qui permet à un utilisateur de suivre un autre utilisateur. Utilisez Zod pour valider les entrées afin d'assurer la sécurité des données.

1. Créer le schéma de validation pour le suivi (followSchema)

Définissez un schéma followSchema avec Zod pour valider les données de suivi. Les données de suivi doivent inclure :

followerId : ID de l'utilisateur qui suit (doit être un entier positif).

followeeId : ID de l'utilisateur suivi (doit être un entier positif).

2. Créer le point de terminaison pour suivre un utilisateur

Implémentez un point de terminaison POST /api/users/follow qui permet à un utilisateur de suivre un autre utilisateur

Puisqu’on nous n’avons pas de base de données, avoir juste un 

const follows = [];

en haut du fichier

* Validez les données de la requête avec followSchema.
* Vérifiez que les IDs des utilisateurs existent avant d'ajouter un suivi.
* En cas de succès, renvoyez les données de suivi avec un statut HTTP 201.
* En cas d'erreur de validation ou si les utilisateurs n'existent pas, renvoyez un message d'erreur approprié avec un statut HTTP 400 ou 404.