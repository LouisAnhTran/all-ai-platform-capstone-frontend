import React from "react"
import { ImFilePdf } from "react-icons/im"
import { FaRegFilePdf } from "react-icons/fa6";
import { GrDocumentPdf } from "react-icons/gr";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const doc_list = [
  {
    doc_name: "Blockchain in Finance",
    pages: 85,
    size: 350,
    user: "john_doe",
  },
  {
    doc_name: "Machine Learning Algorithms",
    pages: 200,
    size: 850,
    user: "alice_smith",
  },
  {
    doc_name: "Global Marketing Strategies",
    pages: 150,
    size: 600,
    user: "maria_garcia",
  },
  {
    doc_name: "Renewable Energy Sources",
    pages: 175,
    size: 700,
    user: "michael_brown",
  },
  {
    doc_name: "Cybersecurity Best Practices",
    pages: 90,
    size: 370,
    user: "emily_wang",
  },
  {
    doc_name: "Art History: Renaissance to Modern",
    pages: 220,
    size: 940,
    user: "jane_adams",
  },
  {
    doc_name: "Healthcare System Analysis",
    pages: 130,
    size: 500,
    user: "david_jones",
  },
  {
    doc_name: "Climate Change and Policy",
    pages: 180,
    size: 720,
    user: "sarah_lee",
  },
  {
    doc_name: "Artificial Intelligence Ethics",
    pages: 110,
    size: 450,
    user: "chris_kim",
  },
  {
    doc_name: "Supply Chain Management",
    pages: 140,
    size: 580,
    user: "alex_martinez",
  },
  {
    doc_name: "Healthcare System Analysis",
    pages: 130,
    size: 500,
    user: "david_jones",
  },
  {
    doc_name: "Climate Change and Policy",
    pages: 180,
    size: 720,
    user: "sarah_lee",
  },
  {
    doc_name: "Artificial Intelligence Ethics",
    pages: 110,
    size: 450,
    user: "chris_kim",
  },
  {
    doc_name: "Supply Chain Management",
    pages: 140,
    size: 580,
    user: "alex_martinez",
  },
]

const PDFDisplay = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full w-full grid grid-cols-4 gap-4 px-4 pb-2">
        {doc_list.map(item => (
          <div className="p-3 border-2 rounded-2xl inline-block shadow-lg border-gray-300 hover:ring-2 hover:ring-inset hover:ring-gray-500 hover:bg-gray-200 cursor-pointer">
            <div className="flex flex-col align-middle items-center justify-center">
              <ImFilePdf className="w-20 h-20" />
            </div>
            <div className="text-center pt-4">
              {item.doc_name} (pages: {item.pages}, size: {item.size} KB)
              <br />
              shared by
              <strong> {item.user}</strong>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-[%10]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default PDFDisplay
