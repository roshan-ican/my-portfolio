# Admin Dashboard - Project Management

This portfolio includes an admin dashboard for managing projects. Here's how to use it:

## Features

- **Secure Login**: Admin authentication system
- **Project Management**: Add, edit, and delete projects with comprehensive details
- **Project List View**: See all projects in an organized list with quick actions
- **Default Projects Management**: Edit the 12 pre-configured projects that come with the portfolio
- **Initialize Default Projects**: Add default projects to the database with one click
- **Real-time Preview**: See how your project will look before saving
- **Form Validation**: Ensures all required fields are filled
- **Responsive Design**: Works on all devices
- **Persistent Storage**: Projects are saved permanently and survive server restarts

## Access

### Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

### Access Points

1. **Navigation Menu**: Click "Admin" in the main navigation
2. **Projects Page**: Click "Add Project" button in the top-right corner
3. **Direct URL**: Navigate to `/admin/login`

### Admin Dashboard Sections

- **Add New Project** (`/admin`): Create new projects with full form
- **Manage Projects** (`/admin/projects`): View, edit, and delete existing projects
- **Initialize Default Projects**: Add the 12 default projects to the database

## Default Projects

The portfolio comes with 12 pre-configured projects that you can now edit through the admin interface:

1. **Medical E-commerce Platform** - Healthcare-focused e-commerce solution
2. **Car Booking System** - Vehicle rental and booking platform
3. **Travel Agency Platform** - Tour booking and travel management
4. **Furniture E-commerce** - Specialized furniture shopping platform
5. **Salary Slip Generator** - Payroll and salary management system
6. **Digital Banking Platform** - Modern banking application
7. **Movie Website** - Movie browsing and information platform
8. **Real Estate Platform** - Property listings and management
9. **Digital Agency Website** - Agency services showcase
10. **Sweet Delights Bakery** - Bakery e-commerce platform
11. **Medical Store Management** - Medical inventory and sales system
12. **Web App Builder** - Drag-and-drop web application builder

### Managing Default Projects

1. **Initialize**: Click "Initialize Defaults" in the admin dashboard to add default projects
2. **Edit**: Go to "Manage Projects" to edit any of the default projects
3. **Customize**: Modify titles, descriptions, images, technologies, and features
4. **Update**: Save changes to customize the projects for your portfolio

## Project Management

### Adding a New Project

#### Required Fields
- **Project ID**: Unique identifier (auto-generated)
- **Title**: Project name
- **Short Description**: Brief overview (displayed in cards)
- **Long Description**: Detailed description (shown in popup)
- **GitHub URL**: Link to source code
- **Image URL**: Project screenshot or icon

#### Optional Fields
- **Live Demo URL**: Link to live project (if available)
- **Status**: Project status (Completed, In Progress, Planning)
- **Gradient Style**: Visual theme for project cards
- **Technologies**: Tech stack used (add multiple)
- **Features**: Key features (add multiple)

#### Steps to Add a Project

1. **Login**: Use admin credentials to access the dashboard
2. **Navigate**: Go to "Add New Project" section
3. **Fill Form**: Complete all required fields
4. **Add Technologies**: Click "+" to add each technology
5. **Add Features**: Click "+" to add each feature
6. **Preview**: Review the project preview on the right
7. **Submit**: Click "Add Project" to save

### Managing Existing Projects

#### View All Projects
1. **Access**: Go to "Manage Projects" section from admin dashboard
2. **Browse**: View all projects in an organized list
3. **Details**: See project information, status, and links

#### Edit a Project
1. **Find Project**: Locate the project in the list
2. **Click Edit**: Click the edit (pencil) icon
3. **Modify**: Update project details in the modal
4. **Save**: Click "Save Changes" to update

#### Delete a Project
1. **Find Project**: Locate the project in the list
2. **Click Delete**: Click the delete (trash) icon
3. **Confirm**: Confirm deletion in the popup
4. **Complete**: Project is permanently removed

## Technical Details

### API Endpoints

- `POST /api/projects` - Add new project
- `GET /api/projects` - Fetch all projects
- `PUT /api/projects/[id]` - Update specific project
- `DELETE /api/projects/[id]` - Delete specific project
- `GET /api/projects/[id]` - Get specific project

### Data Structure

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  features: string[];
  gradient: string;
  status: string;
}
```

### Security Notes

- Current implementation uses localStorage for session management
- In production, implement proper authentication (JWT, OAuth, etc.)
- Add rate limiting and input sanitization
- Use environment variables for sensitive data

## Customization

### Adding New Gradient Options

Edit the `gradientOptions` array in `/src/app/admin/page.tsx`:

```typescript
const gradientOptions = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  // Add your custom gradients here
];
```

### Adding New Status Options

Edit the `statusOptions` array in `/src/app/admin/page.tsx`:

```typescript
const statusOptions = ["Completed", "In Progress", "Planning", "On Hold"];
```

## Future Enhancements

- [ ] Project editing functionality
- [ ] Project deletion with confirmation
- [ ] Image upload capability
- [ ] Bulk project import/export
- [ ] Project categories/tags
- [ ] Analytics dashboard
- [ ] User management system
- [ ] Activity logs

## Troubleshooting

### Common Issues

1. **Form not submitting**: Check that all required fields are filled
2. **Image not loading**: Verify the image URL is accessible
3. **Login not working**: Clear browser cache and try again
4. **Projects not saving**: Check browser console for API errors

### Development

To run the admin dashboard locally:

```bash
npm run dev
```

Then navigate to `http://localhost:3000/admin/login`

## Support

For issues or questions about the admin dashboard, please check the browser console for error messages and ensure all required fields are properly filled.
