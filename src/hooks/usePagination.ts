import { useState, useMemo } from 'react'

function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, currentPage, itemsPerPage])


  const resetPage = () => setCurrentPage(1)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    resetPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  }
}

export default usePagination
