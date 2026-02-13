'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  ArrowRight,
  ChevronDown,
  Cloud,
  CreditCard,
  Download,
  Github,
  Heart,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Settings,
  Star,
  Trash2,
  User,
  UserPlus,
  Users,
} from 'lucide-react'
import { toast } from 'sonner'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className='flex flex-col gap-2'>
      <h3 className='text-muted-foreground px-1 text-sm font-medium'>
        {title}
      </h3>
      <div className='border-border rounded-lg border p-4'>{children}</div>
    </section>
  )
}

export function KitchenSink() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [position, setPosition] = useState('bottom')

  return (
    <div className='grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {/* Badge | Avatar | Skeleton */}
      <Section title='Badge'>
        <div className='flex flex-wrap gap-2'>
          <Badge>Default</Badge>
          <Badge variant='secondary'>Secondary</Badge>
          <Badge variant='destructive'>Destructive</Badge>
          <Badge variant='outline'>Outline</Badge>
        </div>
      </Section>

      <Section title='Avatar'>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
          <Avatar size='lg'>
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar size='sm'>
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Section title='Skeleton'>
        <div className='flex items-center gap-4'>
          <Skeleton className='size-10 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-4 w-28' />
          </div>
        </div>
      </Section>

      {/* Button | Dropdown | Toast */}
      <Section title='Button'>
        <div className='space-y-3'>
          <div className='flex flex-wrap gap-2'>
            <Button>Default</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button variant='link'>Link</Button>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <Button size='xs'>Extra Small</Button>
            <Button size='sm'>Small</Button>
            <Button size='default'>Default</Button>
            <Button size='lg'>Large</Button>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <Button>
              <Plus data-icon='inline-start' /> Create
            </Button>
            <Button variant='outline'>
              <Download data-icon='inline-start' /> Download
            </Button>
            <Button variant='secondary'>
              Continue <ArrowRight data-icon='inline-end' />
            </Button>
            <Button variant='destructive'>
              <Trash2 data-icon='inline-start' /> Delete
            </Button>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <Button variant='outline' size='icon-xs'>
              <Plus />
            </Button>
            <Button variant='outline' size='icon-sm'>
              <Heart />
            </Button>
            <Button variant='outline' size='icon'>
              <Star />
            </Button>
            <Button variant='outline' size='icon-lg'>
              <Settings />
            </Button>
          </div>
        </div>
      </Section>

      <Section title='Dropdown Menu'>
        <div className='flex flex-wrap gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' />}>
              Menu <ChevronDown data-icon='inline-end' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User /> Profile
                  <DropdownMenuShortcut>
                    &#x21E7;&#x2318;P
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard /> Billing
                  <DropdownMenuShortcut>&#x2318;B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Settings
                  <DropdownMenuShortcut>&#x2318;S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Keyboard /> Shortcuts
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users /> Team
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus /> Invite Users
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail /> Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare /> Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Plus /> More&hellip;
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github /> GitHub
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy /> Support
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Cloud /> API
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant='destructive'>
                <LogOut /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' />}>
              Checkboxes <ChevronDown data-icon='inline-end' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={(checked: boolean) => {
                  setShowStatusBar(checked)
                }}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={(checked: boolean) => {
                  setShowActivityBar(checked)
                }}
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={(checked: boolean) => {
                  setShowPanel(checked)
                }}
              >
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='outline' />}>
              Radios <ChevronDown data-icon='inline-end' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Position</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={(value: string) => {
                  setPosition(value)
                }}
              >
                <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='bottom'>
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='right'>
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Section>

      <Section title='Toast'>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant='outline'
            onClick={() => {
              toast('Event has been created.')
            }}
          >
            Default
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              toast.success('Successfully saved!')
            }}
          >
            Success
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              toast.info('This template uses Sonner.')
            }}
          >
            Info
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              toast.warning('Please check your input.')
            }}
          >
            Warning
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              toast.error('Something went wrong.')
            }}
          >
            Error
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              toast.loading('Loading...')
            }}
          >
            Loading
          </Button>
        </div>
      </Section>

      {/* Card | Dialog | Tabs */}
      <section className='flex flex-col gap-2'>
        <h3 className='text-muted-foreground px-1 text-sm font-medium'>
          Card
        </h3>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content with any elements you need.</p>
          </CardContent>
          <CardFooter>
            <Button size='sm'>Action</Button>
          </CardFooter>
        </Card>
      </section>

      <Section title='Dialog'>
        <Dialog>
          <DialogTrigger render={<Button variant='outline' />}>
            Open Dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant='outline' />}>
                Cancel
              </DialogClose>
              <DialogClose render={<Button />}>Continue</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title='Tabs'>
        <Tabs defaultValue='account'>
          <TabsList>
            <TabsTrigger value='account'>Account</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value='account' className='text-muted-foreground pt-3'>
            Make changes to your account here.
          </TabsContent>
          <TabsContent value='password' className='text-muted-foreground pt-3'>
            Change your password here.
          </TabsContent>
        </Tabs>
      </Section>

      {/* Input | Textarea | Select */}
      <Section title='Input'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='you@example.com' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='disabled'>Disabled</Label>
            <Input id='disabled' placeholder='Disabled input' disabled />
          </div>
        </div>
      </Section>

      <Section title='Textarea'>
        <div className='space-y-2'>
          <Label htmlFor='message'>Message</Label>
          <Textarea id='message' placeholder='Type your message here.' />
        </div>
      </Section>

      <Section title='Select'>
        <div className='space-y-2'>
          <Label>Framework</Label>
          <Select defaultValue='react'>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a framework' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='react'>React</SelectItem>
              <SelectItem value='vue'>Vue</SelectItem>
              <SelectItem value='svelte'>Svelte</SelectItem>
              <SelectItem value='angular'>Angular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* Checkbox & Switch | Tooltip | Separator */}
      <Section title='Checkbox &amp; Switch'>
        <div className='space-y-4'>
          <Label className='flex items-center gap-2'>
            <Checkbox defaultChecked />
            Accept terms and conditions
          </Label>
          <Label className='flex items-center gap-2'>
            <Checkbox />
            Send me marketing emails
          </Label>
          <Separator />
          <Label className='flex items-center gap-2'>
            <Switch defaultChecked />
            Airplane mode
          </Label>
          <Label className='flex items-center gap-2'>
            <Switch />
            Dark mode
          </Label>
        </div>
      </Section>

      <Section title='Tooltip'>
        <div className='flex gap-2'>
          <Tooltip>
            <TooltipTrigger render={<Button variant='outline' />}>
              Hover me
            </TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant='outline' size='icon' />}>
              <Plus />
            </TooltipTrigger>
            <TooltipContent>Add new item</TooltipContent>
          </Tooltip>
        </div>
      </Section>

      <Section title='Separator'>
        <div className='space-y-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium'>Horizontal</p>
            <Separator />
          </div>
          <div className='flex h-5 items-center gap-4'>
            <span className='text-sm'>Blog</span>
            <Separator orientation='vertical' />
            <span className='text-sm'>Docs</span>
            <Separator orientation='vertical' />
            <span className='text-sm'>Source</span>
          </div>
        </div>
      </Section>

      {/* Table (full width) */}
      <section className='flex flex-col gap-2 md:col-span-2 lg:col-span-3'>
        <h3 className='text-muted-foreground px-1 text-sm font-medium'>
          Table
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>Alice Johnson</TableCell>
              <TableCell>
                <Badge variant='secondary'>Active</Badge>
              </TableCell>
              <TableCell className='text-right'>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Bob Smith</TableCell>
              <TableCell>
                <Badge variant='outline'>Inactive</Badge>
              </TableCell>
              <TableCell className='text-right'>$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Charlie Brown</TableCell>
              <TableCell>
                <Badge variant='secondary'>Active</Badge>
              </TableCell>
              <TableCell className='text-right'>$350.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
