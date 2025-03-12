"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { AnimatePresence, motion } from "framer-motion";
import { client } from "@/utils/amplify-client-utils";
import type { Schema } from "@/amplify/data/resource";


export default function RobdayCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [showAgendaForm, setShowAgendaForm] = useState<boolean>(false);
  const [agendaTitle, setAgendaTitle] = useState<string>("");
  const [agendaDescription, setAgendaDescription] = useState<string>("");
  const [robdayLogs, setRobdayLogs] = useState<Array<Schema["Robdaylog"]["type"]>>([]);
  const [selectedRobdayLog, setSelectedRobdayLog] = useState<Schema["Robdaylog"]["type"] | null>(null);
  const [selectedRobdayActivities, setSelectedRobdayActivities] = useState<Array<Schema["Activity"]["type"]>>([]);
  const [selectedActivityInstances, setSelectedActivityInstances] = useState<Array<Schema["ActivityInstance"]["type"]>>([]);

  const fetchRobdayLogs = () => {
    client.models.Robdaylog.observeQuery().subscribe({
      next: async (response) => {
        if (date) {
          const filteredRobdayLogs = response.items.filter((log) => {
            return log.date === date.toISOString().split('T')[0];
          });
          setSelectedRobdayLog(filteredRobdayLogs[0] || null);
          if (filteredRobdayLogs[0]) {
            const activities = (await filteredRobdayLogs[0].activities()).data as Schema["Activity"]["type"][];
            setSelectedRobdayActivities(activities);
            console.log(activities);
            

            const activityInstances = (await filteredRobdayLogs[0].activityInstances()).data as Schema["ActivityInstance"]["type"][];
            setSelectedActivityInstances(activityInstances.flat() as Schema["ActivityInstance"]["type"][]);
            console.log(activityInstances);
          }
          console.log(filteredRobdayLogs);
          setRobdayLogs([...response.items]);
        } 
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  function formatMondayAsRobday(date: Date) {
    return date.getDay() === 1 ? "Rob" : date.toLocaleDateString("en-US", { weekday: "short" });
  }

  // Custom modifier to identify Mondays
  function isMonday(date: Date) {
    return date.getDay() === 1;
  }

  // Custom modifier to identify next Monday
  function isNextMonday(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find the date of the next Monday
    const nextMonday = new Date(today);
    const daysUntilNextMonday = (1 + 7 - today.getDay()) % 7 || 7; // Calculate days until next Monday
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);

    // Compare if the given date is the next Monday
    return date.getDay() === 1 &&
      date.getDate() === nextMonday.getDate() &&
      date.getMonth() === nextMonday.getMonth() &&
      date.getFullYear() === nextMonday.getFullYear();
  }

  // Handle day selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShowAgendaForm(true);
    }
  };

  // Handle agenda submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      date: date,
      title: agendaTitle,
      description: agendaDescription
    });

    // Reset form
    setAgendaTitle("");
    setAgendaDescription("");
    setShowAgendaForm(false);
  };


  useEffect(() => {
    fetchRobdayLogs();
    console.log(date);
  }, [date]);

  return (
    <div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="bg-linear-to-t from-stone-900 to-stone-950 rounded-md shadow transition-all duration-200 ease-in-out">
          <Calendar
            mode="single"
            selected={date}
            // onSelect={(date) => date && setDate(date)}
            onSelect={handleDateSelect}
            className="rounded-md border shadow transition-all duration-200 ease-in-out w-full"
            formatters={{ formatWeekdayName: formatMondayAsRobday }}
            modifiers={{
              monday: isMonday,
              nextMonday: isNextMonday
            }}
            modifiersClassNames={{
              selected: "bg-stone-800 text-white font-bold hover:bg-rose-800 ring-2 ring-rose-500 transition-all duration-200 ease-in-out",
              monday: "bg-rose-950 text-white hover:bg-rose-800 transition-colors duration-200 ease-in-out",
              nextMonday: "bg-rose-900 text-white font-bold hover:bg-rose-800 shadow shadow-rose-500 transition-all duration-200 ease-in-out"
            }}
          />
        </div>
      </motion.div>
      <AnimatePresence>
        {showAgendaForm && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 bottom-0 right-0 bg-linear-to-t from-stone-900 to-sky-950 rounded-t-lg p-4 shadow-lg border-t border-slate-800 z-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-stone-200">
                Create Robday Agenda for {date.toLocaleDateString()}
              </h3>
              <button
                onClick={() => setShowAgendaForm(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="title" className="block text-sm text-slate-300 mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={agendaTitle}
                  onChange={(e) => setAgendaTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Meeting title..."
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={agendaDescription}
                  onChange={(e) => setAgendaDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Add details..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAgendaForm(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}