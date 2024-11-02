import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/getAllCompanies";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  );

  console.log(companies);

  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useGetAllCompanies(); // Fetch all companies on mount

  useEffect(() => {
    const filterCompanies = () => {
      if (!searchCompanyByText) return companies; // If no search term, return all companies

      return companies.filter((company) =>
        company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      );
    };

    setFilteredCompanies(filterCompanies()); // Update filtered companies
  }, [companies, searchCompanyByText]);

  // Handle company row click to navigate to job post section
  const handleCompanyClick = (companyId) => {
    navigate(`/admin/PostJob/${companyId}`); // Redirect to PostJob page with companyId
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow
                key={company._id}
                // Navigate on row click
                className="cursor-pointer" // Make row look clickable
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </TableCell>
                <TableCell
                  onClick={() => handleCompanyClick(company._id)}
                  className="hover:text-red-700 hover:underline"
                >
                  {company.name}
                </TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                {/* Converts ISO string to a more readable date format */}
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          navigate(`/admin/companies/${company._id}/edit`); // Navigate to edit page
                        }}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                No companies available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
