"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import jobData from "@/data/url.json"
import type { JobSite } from "@/types/job-types"
import { capitalizePhrase } from "@/lib/utils"

// Extrae y aplana todos los sitios desde jobData
const sites: JobSite[] = Object.values(jobData.job_boards).flatMap(
  (category) => category.sites
)

// Columnas para la tabla
const columns: ColumnDef<JobSite>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        aria-sort={
          column.getIsSorted()
            ? column.getIsSorted() === "asc"
              ? "ascending"
              : "descending"
            : "none"
        }
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <a
        href={row.getValue("url")}
        className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline focus:ring-2 focus:ring-primary/50"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ir a la web de ${row.getValue("name")}`}
      >
        {row.getValue("url")}
      </a>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        aria-sort={
          column.getIsSorted()
            ? column.getIsSorted() === "asc"
              ? "ascending"
              : "descending"
            : "none"
        }
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Categoría <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <Button
        variant="ghost"
        aria-sort={
          column.getIsSorted()
            ? column.getIsSorted() === "asc"
              ? "ascending"
              : "descending"
            : "none"
        }
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ubicación <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium capitalize">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        aria-sort={
          column.getIsSorted()
            ? column.getIsSorted() === "asc"
              ? "ascending"
              : "descending"
            : "none"
        }
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Descripción <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {capitalizePhrase(row.getValue("description") as string)}
      </div>
    ),
  },
]

export function JobSitesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [isMobile, setIsMobile] = React.useState(false)

  // Hook para detectar tamaño de pantalla
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const table = useReactTable({
    data: sites,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()

  return (
    <div className="w-full mx-auto">
      {/* Contenedor principal adaptativo */}
      <div
        className="bg-card rounded-lg sm:rounded-xl 
                      border border-border/50 
                      shadow-sm hover:shadow-md transition-shadow duration-300
                      overflow-hidden"
      >
        {/* Header con filtros */}
        <div
          className="p-3 xs:p-4 sm:p-6 
                        border-b border-border/50 
                        bg-muted/30"
        >
          <div
            className="flex flex-row items-center xs:flex-row gap-3 xs:gap-4 
                          xs:items-center xs:justify-between"
          >
            <div className="flex-1 max-w-sm">
              <label htmlFor="filter-name" className="sr-only">
                Filtrar por nombre
              </label>
              <Input
                id="filter-name"
                placeholder="🔍 Escribe el nombre de la web..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="w-full text-sm sm:text-base
                          h-9 sm:h-10
                          transition-all duration-200
                          focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Indicador de resultados */}
            <div className="text-xs sm:text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} resultado
              {table.getFilteredRowModel().rows.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Tabla o Cards según el dispositivo */}
        <div className="relative">
          {/* Vista de tabla para todos los dispositivos, con scroll horizontal en móvil */}
          <div className="overflow-x-auto w-full">
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-border/30 hover:bg-muted/30"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        scope="col"
                        className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-semibold text-muted-foreground whitespace-nowrap"
                        aria-sort={
                          header.column.getIsSorted
                            ? header.column.getIsSorted() === "asc"
                              ? "ascending"
                              : header.column.getIsSorted() === "desc"
                              ? "descending"
                              : "none"
                            : undefined
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-border/20 hover:bg-muted/40 transition-colors duration-200 animate-in fade-in slide-in-from-bottom-1"
                      style={{ animationDelay: `${index * 30}ms` }}
                      tabIndex={0}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base text-foreground whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <div className="text-4xl mb-2">🔍</div>
                        <p className="text-sm">No se encontraron resultados</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Paginación mejorada */}
        {totalPages > 1 && (
          <div
            className="p-3 xs:p-4 sm:p-6 
                          border-t border-border/50 
                          bg-muted/20"
          >
            <div
              className="flex flex-col xs:flex-row 
                            items-center justify-between 
                            gap-3 xs:gap-4"
            >
              {/* Info de página */}
              <div className="text-xs sm:text-sm order-2 xs:order-1">
                Página {currentPage + 1} de {totalPages}
              </div>

              {/* Controles de paginación */}
              <Pagination
                aria-label="Navegación de páginas"
                className="py-2 sm:py-4 flex justify-center"
              >
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      aria-label="Página anterior"
                      onClick={(e) => {
                        e.preventDefault()
                        table.previousPage()
                      }}
                      className={`
                        ${
                          !table.getCanPreviousPage()
                            ? ""
                            : "pointer-events-none opacity-50"
                        }
                        transition-all duration-200`}
                    />
                  </PaginationItem>

                  {/* Sistema de páginas inteligente */}
                  {(() => {
                    const maxVisible = isMobile ? 3 : 5
                    const halfVisible = Math.floor(maxVisible / 2)
                    let startPage = Math.max(0, currentPage - halfVisible)
                    const endPage = Math.min(totalPages, startPage + maxVisible)

                    if (endPage - startPage < maxVisible) {
                      startPage = Math.max(0, endPage - maxVisible)
                    }

                    const pages = []

                    // Primera página si no está visible
                    if (startPage > 0) {
                      pages.push(
                        <PaginationItem key="first">
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              table.setPageIndex(0)
                            }}
                            className="
                                     transition-all duration-200"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                      )

                      if (startPage > 1) {
                        pages.push(
                          <PaginationItem key="ellipsis1">
                            <PaginationEllipsis className="h-8 w-8 sm:h-9 sm:w-9" />
                          </PaginationItem>
                        )
                      }
                    }

                    // Páginas visibles
                    for (let i = startPage; i < endPage; i++) {
                      pages.push(
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={i === currentPage}
                            onClick={(e) => {
                              e.preventDefault()
                              table.setPageIndex(i)
                            }}
                            className={`
                              transition-all duration-200
                              ${i === currentPage ? "bg-primary" : ""}`}
                            aria-label={`${
                              i === currentPage ? "Página actual, " : ""
                            }Página ${i + 1}`}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }

                    // Última página si no está visible
                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pages.push(
                          <PaginationItem key="ellipsis2">
                            <PaginationEllipsis className="h-8 w-8 sm:h-9 sm:w-9" />
                          </PaginationItem>
                        )
                      }

                      pages.push(
                        <PaginationItem key="last">
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              table.setPageIndex(totalPages - 1)
                            }}
                            className="
                                     transition-all duration-200"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }

                    return pages
                  })()}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      aria-label="Página siguiente"
                      onClick={(e) => {
                        e.preventDefault()
                        table.nextPage()
                      }}
                      className={`
                        ${
                          !table.getCanNextPage()
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                        transition-all duration-200`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
