import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EventList = ({ events = [] }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'upcoming': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'ongoing': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'completed': return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      case 'cancelled': return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'postponed': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Event Management
            </h1>
            <p className="text-gray-600">Manage and track all your events in one place</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Events Yet</h3>
            <p className="text-gray-500 text-lg">Create your first event to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Event Management
            </h1>
            <p className="text-gray-600">Manage and track all your events in one place</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-100">
            <span className="text-sm text-gray-500">Total Events</span>
            <p className="text-2xl font-bold text-gray-800">{events.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.map((event, index) => {
                  const { date, time } = formatDate(event.date);
                  return (
                    <tr 
                      key={event.id || index} 
                      className="hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                          <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{date}</div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{event.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-4 py-2 inline-flex items-center text-xs font-bold rounded-full shadow-sm ${getStatusColor(event.status)}`}>
                          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo usage with sample events
const EventManagementDemo = () => {
  const sampleEvents = [
    { id: 1, date: '2025-10-15T10:00:00', location: 'Convention Center, New York', status: 'Upcoming' },
    { id: 2, date: '2025-09-30T14:30:00', location: 'Tech Hub, San Francisco', status: 'Ongoing' },
    { id: 3, date: '2025-09-20T09:00:00', location: 'Grand Hall, Chicago', status: 'Completed' },
    { id: 4, date: '2025-11-05T16:00:00', location: 'Stadium Arena, Los Angeles', status: 'Upcoming' },
    { id: 5, date: '2025-08-15T11:00:00', location: 'Community Center, Austin', status: 'Cancelled' },
    { id: 6, date: '2025-11-20T18:00:00', location: 'Music Hall, Nashville', status: 'Postponed' },
  ];

  return <EventList events={sampleEvents} />;
};

export default EventManagementDemo;