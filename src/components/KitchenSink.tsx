'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
} from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/button-group'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Spinner } from '@/components/ui/spinner'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowRight,
  Bold,
  Calculator,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronsUpDown,
  Clipboard,
  Cloud,
  Copy,
  CreditCard,
  Download,
  Github,
  Heart,
  Inbox,
  Italic,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Smile,
  Star,
  Terminal,
  Trash2,
  TriangleAlert,
  Underline,
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

      {/* Card | Dialog | Alert Dialog */}
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
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant='outline' />}>
                Cancel
              </DialogClose>
              <DialogClose render={<Button />}>Save</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title='Alert Dialog'>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant='outline' />}>
            Delete Account
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant='destructive'>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>

      {/* Tabs | Sheet | Popover */}
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

      <Section title='Sheet'>
        <Sheet>
          <SheetTrigger render={<Button variant='outline' />}>
            Open Sheet
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>
                This is a slide-in panel from the edge of the screen.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Section>

      <Section title='Popover'>
        <Popover>
          <PopoverTrigger render={<Button variant='outline' />}>
            Open Popover
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
            </PopoverHeader>
            <div className='grid gap-2'>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='width'>Width</Label>
                <Input id='width' defaultValue='100%' className='col-span-2' />
              </div>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='height'>Height</Label>
                <Input id='height' defaultValue='25px' className='col-span-2' />
              </div>
            </div>
          </PopoverContent>
        </Popover>
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

      {/* Checkbox & Switch | Radio Group | Tooltip */}
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

      <Section title='Radio Group'>
        <RadioGroup defaultValue='comfortable'>
          <Label className='flex items-center gap-2'>
            <RadioGroupItem value='default' />
            Default
          </Label>
          <Label className='flex items-center gap-2'>
            <RadioGroupItem value='comfortable' />
            Comfortable
          </Label>
          <Label className='flex items-center gap-2'>
            <RadioGroupItem value='compact' />
            Compact
          </Label>
        </RadioGroup>
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

      {/* Alert | Progress | Breadcrumb */}
      <Section title='Alert'>
        <div className='space-y-3'>
          <Alert>
            <Terminal />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components using the CLI.
            </AlertDescription>
          </Alert>
          <Alert variant='destructive'>
            <TriangleAlert />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
      </Section>

      <Section title='Progress'>
        <div className='space-y-4'>
          <Progress value={25} />
          <Progress value={60} />
          <Progress value={100} />
        </div>
      </Section>

      <Section title='Breadcrumb'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      {/* Toggle | Drawer | Slider */}
      <Section title='Toggle &amp; Toggle Group'>
        <div className='space-y-3'>
          <div className='flex gap-2'>
            <Toggle aria-label='Toggle bold'>
              <Bold />
            </Toggle>
            <Toggle aria-label='Toggle italic'>
              <Italic />
            </Toggle>
            <Toggle aria-label='Toggle underline'>
              <Underline />
            </Toggle>
          </div>
          <ToggleGroup variant='outline'>
            <ToggleGroupItem value='left' aria-label='Align left'>
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value='center' aria-label='Align center'>
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value='right' aria-label='Align right'>
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Section>

      <Section title='Drawer'>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant='outline'>Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>
                A bottom sheet that slides up from the edge of the screen.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section title='Slider'>
        <div className='space-y-6'>
          <Slider defaultValue={[50]} />
          <Slider defaultValue={[25, 75]} />
        </div>
      </Section>

      {/* Accordion | Collapsible | Command */}
      <Section title='Accordion'>
        <Accordion>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title='Collapsible'>
        <Collapsible>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>3 items</span>
            <CollapsibleTrigger render={<Button variant='ghost' size='icon-sm' />}>
              <ChevronsUpDown />
            </CollapsibleTrigger>
          </div>
          <div className='border-border rounded-md border px-3 py-2 text-sm'>
            Always visible
          </div>
          <CollapsibleContent>
            <div className='mt-2 space-y-2'>
              <div className='border-border rounded-md border px-3 py-2 text-sm'>
                Hidden item 1
              </div>
              <div className='border-border rounded-md border px-3 py-2 text-sm'>
                Hidden item 2
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Section title='Command'>
        <Command className='border-border rounded-lg border'>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              <CommandItem>
                <CalendarIcon /> Calendar
              </CommandItem>
              <CommandItem>
                <Smile /> Search Emoji
              </CommandItem>
              <CommandItem>
                <Calculator /> Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Settings'>
              <CommandItem>
                <User /> Profile
              </CommandItem>
              <CommandItem>
                <Settings /> Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Section>

      {/* Input Group | Kbd & Spinner | Empty */}
      <Section title='Input Group'>
        <div className='space-y-3'>
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder='Search...' />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder='example.com' />
          </InputGroup>
        </div>
      </Section>

      <Section title='Kbd &amp; Spinner'>
        <div className='space-y-4'>
          <div className='flex flex-wrap items-center gap-2'>
            <Kbd>&#x2318;K</Kbd>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Enter</Kbd>
          </div>
          <Separator />
          <div className='flex items-center gap-3'>
            <Spinner />
            <Spinner className='size-6' />
            <Spinner className='size-8' />
          </div>
        </div>
      </Section>

      <Section title='Empty'>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <Inbox />
            </EmptyMedia>
            <EmptyTitle>No items yet</EmptyTitle>
            <EmptyDescription>
              Get started by creating your first item.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Section>

      {/* Separator | Scroll Area | Pagination */}
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

      <Section title='Scroll Area'>
        <ScrollArea className='h-40 rounded-md border p-4'>
          <div className='space-y-4'>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className='text-sm'>
                Item {String(i + 1)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Section>

      {/* Context Menu | Hover Card | Combobox */}
      <Section title='Context Menu'>
        <ContextMenu>
          <ContextMenuTrigger className='border-border flex h-24 items-center justify-center rounded-md border border-dashed text-sm'>
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Clipboard /> Cut
            </ContextMenuItem>
            <ContextMenuItem>
              <Copy /> Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <Clipboard /> Paste
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant='destructive'>
              <Trash2 /> Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Section>

      <Section title='Hover Card'>
        <HoverCard>
          <HoverCardTrigger
            render={<a href='#' />}
            className='text-sm underline underline-offset-4'
          >
            @nextjs
          </HoverCardTrigger>
          <HoverCardContent>
            <div className='space-y-2'>
              <h4 className='text-sm font-semibold'>@nextjs</h4>
              <p className='text-muted-foreground text-sm'>
                The React Framework — created and maintained by @vercel.
              </p>
              <div className='text-muted-foreground flex items-center gap-1 text-xs'>
                <CalendarIcon className='size-3' /> Joined December 2021
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Section>

      <Section title='Combobox'>
        <Combobox>
          <ComboboxInput placeholder='Search framework...' />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              <ComboboxItem value='next'>Next.js</ComboboxItem>
              <ComboboxItem value='remix'>Remix</ComboboxItem>
              <ComboboxItem value='astro'>Astro</ComboboxItem>
              <ComboboxItem value='nuxt'>Nuxt</ComboboxItem>
              <ComboboxItem value='svelte'>SvelteKit</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Section>

      {/* Aspect Ratio | Button Group | Native Select */}
      <Section title='Aspect Ratio'>
        <AspectRatio ratio={16 / 9} className='bg-muted rounded-md'>
          <div className='flex size-full items-center justify-center text-sm text-muted-foreground'>
            16:9
          </div>
        </AspectRatio>
      </Section>

      <Section title='Button Group'>
        <div className='space-y-3'>
          <ButtonGroup>
            <Button variant='outline'>Left</Button>
            <ButtonGroupSeparator />
            <Button variant='outline'>Center</Button>
            <ButtonGroupSeparator />
            <Button variant='outline'>Right</Button>
          </ButtonGroup>
          <ButtonGroup orientation='vertical'>
            <Button variant='outline' size='sm'>Top</Button>
            <ButtonGroupSeparator orientation='horizontal' />
            <Button variant='outline' size='sm'>Bottom</Button>
          </ButtonGroup>
        </div>
      </Section>

      <Section title='Native Select'>
        <NativeSelect>
          <NativeSelectOption value=''>Select a fruit...</NativeSelectOption>
          <NativeSelectOption value='apple'>Apple</NativeSelectOption>
          <NativeSelectOption value='banana'>Banana</NativeSelectOption>
          <NativeSelectOption value='cherry'>Cherry</NativeSelectOption>
          <NativeSelectOption value='grape'>Grape</NativeSelectOption>
        </NativeSelect>
      </Section>

      {/* Input OTP | Menubar | Carousel */}
      <Section title='Input OTP'>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Section>

      <Section title='Menubar'>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>&#x2318;T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window <MenubarShortcut>&#x2318;N</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print <MenubarShortcut>&#x2318;P</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>&#x2318;Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>&#x21E7;&#x2318;Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Zoom In</MenubarItem>
              <MenubarItem>Zoom Out</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Full Screen</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>

      <Section title='Carousel'>
        <Carousel className='mx-auto w-full max-w-xs'>
          <CarouselContent>
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselItem key={i}>
                <div className='border-border flex aspect-square items-center justify-center rounded-md border text-3xl font-semibold'>
                  {String(i + 1)}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Section>

      {/* Resizable (full width) */}
      <section className='flex flex-col gap-2 md:col-span-2 lg:col-span-3'>
        <h3 className='text-muted-foreground px-1 text-sm font-medium'>
          Resizable
        </h3>
        <div className='border-border rounded-lg border'>
          <ResizablePanelGroup className='min-h-32 rounded-lg'>
            <ResizablePanel defaultSize={50}>
              <div className='flex h-full items-center justify-center p-4'>
                <span className='text-sm font-medium'>Panel A</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
              <div className='flex h-full items-center justify-center p-4'>
                <span className='text-sm font-medium'>Panel B</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25}>
              <div className='flex h-full items-center justify-center p-4'>
                <span className='text-sm font-medium'>Panel C</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>

      {/* Calendar */}
      <Section title='Calendar'>
        <Calendar />
      </Section>

      {/* Pagination */}
      <Section title='Pagination'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#'>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
