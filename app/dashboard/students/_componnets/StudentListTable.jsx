import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const StudentListTable = ({ studentList, refreshData }) => {
  const customButton = (props) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteRecord(props?.data?.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const deleteRecord = (id) => {
    GlobalApi.DeleteStudentsRecord(id)?.then((res) => {
      if (res) {
        toast.success("Record Deleted Successfully");
        refreshData();
      }
    });
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "grade", filter: true },
    { field: "address", filter: true },
    { field: "contact", filter: true },
    { field: "action", cellRenderer: customButton },
  ]);
  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    studentList && setRowData(studentList);
  }, [studentList]);

  return (
    <div className="my-2">
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
          <Search />
          <input
            type="text"
            placeholder="Search here...."
            className="outline-none w-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={
            studentList && (studentList.length >= 10 ? 10 : studentList.length)
          }
          paginationPageSizeSelector={[25, 50, 100]}
          quickFilterText={searchInput}
        />
      </div>
    </div>
  );
};

export default StudentListTable;
