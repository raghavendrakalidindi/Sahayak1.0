import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Search, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Users,
  Eye,
  Check
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

interface ComplaintData {
  'Unique UserId': string | null;
  'Contact': string | null;
  'Compliant TimeStamp': string | null;
  'Compliant-Full': string | null;
  'Compliant-Brief': string | null;
  'Compliant-Category': string | null;
  'Compliant-Urgency': string | null;
  'Compliant-Directed to': string | null;
  'Compliant-Status': string | null;
  'Compliant-Escalation': string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<ComplaintData[]>([]);
  const [selectedComplaints, setSelectedComplaints] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [directedToFilter, setDirectedToFilter] = useState('All');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Set default date range to current month (1st to last day)
    resetDateToCurrentMonth();
    
    fetchUser();
    fetchComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchTerm, statusFilter, priorityFilter, categoryFilter, directedToFilter, dateFromFilter, dateToFilter]);

  useEffect(() => {
    // Clear selections when filtered complaints change
    setSelectedComplaints(new Set());
  }, [filteredComplaints]);
  const resetDateToCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // First day of current month
    const firstDay = new Date(year, month, 1);
    // Last day of current month
    const lastDay = new Date(year, month + 1, 0);
    
    setDateFromFilter(firstDay.toISOString().split('T')[0]);
    setDateToFilter(lastDay.toISOString().split('T')[0]);
  };

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('Complaints Data')
        .select('*')
        .order('Compliant TimeStamp', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterComplaints = () => {
    let filtered = complaints;

    // Date range filter
    if (dateFromFilter || dateToFilter) {
      filtered = filtered.filter(complaint => {
        const complaintDate = complaint['Compliant TimeStamp'];
        if (!complaintDate) return false;
        
        const date = new Date(complaintDate);
        const fromDate = dateFromFilter ? new Date(dateFromFilter) : null;
        const toDate = dateToFilter ? new Date(dateToFilter + 'T23:59:59') : null;
        
        if (fromDate && date < fromDate) return false;
        if (toDate && date > toDate) return false;
        
        return true;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        (complaint['Compliant-Brief']?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (complaint['Compliant-Full']?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (complaint['Contact']?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(complaint => complaint['Compliant-Status'] === statusFilter);
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter(complaint => complaint['Compliant-Urgency'] === priorityFilter);
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(complaint => complaint['Compliant-Category'] === categoryFilter);
    }

    if (directedToFilter !== 'All') {
      filtered = filtered.filter(complaint => complaint['Compliant-Directed to'] === directedToFilter);
    }

    setFilteredComplaints(filtered);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(
        filteredComplaints
          .map(complaint => complaint['Unique UserId'])
          .filter(id => id !== null) as string[]
      );
      setSelectedComplaints(allIds);
    } else {
      setSelectedComplaints(new Set());
    }
  };

  const handleSelectComplaint = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedComplaints);
    if (checked) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedComplaints(newSelected);
  };

  const isAllSelected = filteredComplaints.length > 0 && 
    filteredComplaints.every(complaint => 
      complaint['Unique UserId'] && selectedComplaints.has(complaint['Unique UserId'])
    );

  const isIndeterminate = selectedComplaints.size > 0 && !isAllSelected;

  // Get unique values for dropdown filters
  const uniqueCategories = Array.from(new Set(
    complaints
      .map(c => c['Compliant-Category'])
      .filter(category => category && category.trim() !== '')
  )).sort();

  const uniqueDirectedTo = Array.from(new Set(
    complaints
      .map(c => c['Compliant-Directed to'])
      .filter(directedTo => directedTo && directedTo.trim() !== '')
  )).sort();

  const getStatusColor = (status: string | null) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string | null) => {
    if (!priority) return 'bg-gray-100 text-gray-800';
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: filteredComplaints.length,
    open: filteredComplaints.filter(c => c['Compliant-Status']?.toLowerCase() === 'open').length,
    inProgress: filteredComplaints.filter(c => c['Compliant-Status']?.toLowerCase() === 'in progress').length,
    resolved: filteredComplaints.filter(c => c['Compliant-Status']?.toLowerCase() === 'resolved').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/sahayak-logo.svg" 
                alt="Sahayak Logo" 
                className="h-8 w-auto mr-4"
              />
              <h1 className="text-xl font-bold text-gray-900">Complaints Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 sticky top-20 bg-gray-50 z-30 py-4 -mx-4 px-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-6 sticky top-44 z-20">
          <div className="space-y-4">
            {/* First Row - Date Range Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Date Range Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">From:</label>
                  <input
                    type="date"
                    value={dateFromFilter}
                    onChange={(e) => setDateFromFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">To:</label>
                  <input
                    type="date"
                    value={dateToFilter}
                    onChange={(e) => setDateToFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                </div>
                
                <button
                  onClick={resetDateToCurrentMonth}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Current Month
                </button>
                
                <button
                  onClick={() => {
                    setDateFromFilter('');
                    setDateToFilter('');
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Overall
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                {selectedComplaints.size > 0 && (
                  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
                    {selectedComplaints.size} selected
                  </div>
                )}
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                  {filteredComplaints.length} complaints
                </div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">
                  Read-only view
                </div>
              </div>
            </div>

            {/* Second Row - Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Filter */}
              <div className="flex flex-col lg:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search complaints or contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
                  />
                </div>

                {/* Dropdown Filters */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="All">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="All">All Priority</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="All">All Categories</option>
                  {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={directedToFilter}
                  onChange={(e) => setDirectedToFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="All">All Assignees</option>
                  {uniqueDirectedTo.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (selectedComplaints.size === 0) {
                      alert('Please select complaints to escalate');
                      return;
                    }
                    // TODO: Implement escalation logic
                    alert(`Escalating ${selectedComplaints.size} selected complaint(s)`);
                  }}
                  disabled={selectedComplaints.size === 0}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Escalate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = isIndeterminate;
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-16 bg-gray-50 z-10 border-r border-gray-200">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Complaint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Directed To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Escalation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplaints.map((complaint, index) => (
                  <tr key={complaint['Unique UserId'] || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10 border-r border-gray-200">
                      <input
                        type="checkbox"
                        checked={complaint['Unique UserId'] ? selectedComplaints.has(complaint['Unique UserId']) : false}
                        onChange={(e) => {
                          if (complaint['Unique UserId']) {
                            handleSelectComplaint(complaint['Unique UserId'], e.target.checked);
                          }
                        }}
                        disabled={!complaint['Unique UserId']}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded disabled:opacity-50"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 sticky left-16 bg-white z-10 border-r border-gray-200">
                      {complaint['Unique UserId'] || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint['Contact'] || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {complaint['Compliant-Brief'] || 'No title'}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {complaint['Compliant-Full'] || 'No description'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {complaint['Compliant-Category'] || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(complaint['Compliant-Urgency'])}`}>
                        {complaint['Compliant-Urgency'] || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint['Compliant-Status'])}`}>
                        {complaint['Compliant-Status'] || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint['Compliant-Directed to'] || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {complaint['Compliant TimeStamp'] 
                        ? new Date(complaint['Compliant TimeStamp']).toLocaleDateString()
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint['Compliant-Escalation'] || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No complaints found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Info Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Read-Only Mode
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  This dashboard is currently displaying data from the "Complaints Data" table in read-only mode. 
                  CRUD operations (Create, Update, Delete) are disabled due to schema limitations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;