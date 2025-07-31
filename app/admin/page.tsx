"use client"

import Link from "next/link"
import { BookOpen, Plus, Edit, BarChart3, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your website content and settings</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>Manage blog posts and content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Create, edit, and manage your blog posts. Publish educational content to help your students.
              </p>
              <div className="flex gap-2">
                <Link href="/admin/blog">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage Posts
                  </Button>
                </Link>
                <Link href="/admin/blog/new">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Analytics 
           <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>View website statistics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Track website performance, user engagement, and content analytics.
              </p>
              <Button variant="outline" className="w-full" disabled>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>*/}

          {/* User Management 
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage users and permissions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Manage user accounts, roles, and permissions for your platform.
              </p>
              <Button variant="outline" className="w-full" disabled>
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </CardContent>
          </Card>*/}

          {/* Settings 
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Settings className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure website settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Configure website settings, appearance, and system preferences.
              </p>
              <Button variant="outline" className="w-full" disabled>
                <Settings className="h-4 w-4 mr-2" />
                Open Settings
              </Button>
            </CardContent>
          </Card>*/}

          {/* Quick Stats 
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Overview of your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Blog Posts</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Published Posts</span>
                  <span className="font-semibold text-green-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Draft Posts</span>
                  <span className="font-semibold text-yellow-600">0</span>
                </div>
              </div>
            </CardContent>
          </Card>*/}

          {/* Recent Activity 
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Blog system created</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">3 sample posts added</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">CMS interface ready</span>
                </div>
              </div>
            </CardContent>
          </Card>*/}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link href="/admin/blog/new">
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button className="w-full" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Blog
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Website
                  </Button>
                </Link>
                <Button className="w-full" variant="outline" disabled>
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 