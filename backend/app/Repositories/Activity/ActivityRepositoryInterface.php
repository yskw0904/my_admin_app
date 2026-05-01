<?
namespace App\Repositories\Activity;

interface ActivityRepositoryInterface
{
    public function store(array $data): \App\Models\Activity;

    public function isOverlapping(int $userId, string $start, string $end): bool;
}
