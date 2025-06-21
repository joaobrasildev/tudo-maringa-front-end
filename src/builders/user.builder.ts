export function userBuilder(user: any) {
  return {
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    neighborhood: user.neighborhood?.name ?? "Fora de Maringá",
    neighborhoodId: user.neighborhoodId
  }
}