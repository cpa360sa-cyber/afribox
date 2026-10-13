import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rowToTask } from '../lib/mappers'
import type { Task, TaskStatus } from '../types'

export function useTasks(businessId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!businessId) {
      setTasks([])
      setLoading(false)
      return
    }
    setLoading(true)

    async function load() {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
      setTasks((data ?? []).map(rowToTask))
      setLoading(false)
    }
    load()

    const channel = supabase
      .channel(`tasks-${businessId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `business_id=eq.${businessId}` }, load)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId])

  async function createTask(task: {
    businessId: string
    title: string
    description?: string
    project?: string
    assignee?: string
    priority?: Task['priority']
    dueDate?: number
  }) {
    await supabase.from('tasks').insert({
      business_id: task.businessId,
      title: task.title,
      description: task.description ?? '',
      project: task.project ?? '',
      assignee: task.assignee ?? '',
      priority: task.priority ?? 'medium',
      due_date: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    })
  }

  async function updateTaskStatus(taskId: string, status: TaskStatus) {
    await supabase.from('tasks').update({ status }).eq('id', taskId)
  }

  async function deleteTask(taskId: string) {
    await supabase.from('tasks').delete().eq('id', taskId)
  }

  return { tasks, loading, createTask, updateTaskStatus, deleteTask }
}
