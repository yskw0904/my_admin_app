<?
namespace App\Repositories\Activity;

interface ActivityRepositoryInterface
{
    public function store(array $data): \App\Models\Activity;
}
