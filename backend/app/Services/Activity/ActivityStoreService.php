<?
namespace App\Services\Activity;

use App\Repositories\Activity\ActivityRepositoryInterface;

class ActivityStoreService
{
    private $repository;

    public function __construct(ActivityRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function execute(array $data)
    {
        return $this->repository->store($data);
    }
}
