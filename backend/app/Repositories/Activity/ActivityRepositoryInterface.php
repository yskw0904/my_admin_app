<?
namespace App\Repositories\Activity;

interface ActivityRepositoryInterface
{
    public function store(array $data): \App\Models\Activity;

    public function isOverlapping(int $dailyRecordId, string $start, string $end): bool;
}
