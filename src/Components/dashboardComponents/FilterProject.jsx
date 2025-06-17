



import React, { useState, useEffect } from 'react';

// Dummy project data
const dummyProjects = [
  { id: 1, name: 'Project Alpha', description: 'Feature development', dateCreated: '2024-09-01' },
  { id: 2, name: 'Project Beta', description: 'System optimization', dateCreated: '2024-08-29' },
  { id: 3, name: 'Project Gamma', description: 'Bug fixes', dateCreated: '2024-08-27' },
  { id: 4, name: 'Project Delta', description: 'New module', dateCreated: '2024-08-25' },
  { id: 5, name: 'Project Epsilon', description: 'System upgrade', dateCreated: '2024-08-22' },
];

const FilterProject = () => {
  const [filterDays, setFilterDays] = useState(7);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    filterProjectList();
  }, [filterDays]);

  const filterProjectList = () => {
    const now = new Date();
    const filtered = dummyProjects.filter((project) => {
      const projectDate = new Date(project.dateCreated);
      const timeDifference = now - projectDate;
      const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return dayDifference <= filterDays;
    });
    setFilteredProjects(filtered);
  };

  const handleFilterChange = (event) => {
    setFilterDays(parseInt(event.target.value));
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-4">
          <select className="form-select  shadow-none" value={filterDays} onChange={handleFilterChange}>
            <option value={1}>Last 1 Day</option>
            <option value={3}>Last 3 Days</option>
            <option value={7}>Last 7 Days</option>
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{new Date(project.dateCreated).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No projects found for the selected period.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilterProject;
