import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input, Textarea } from "../components/ui/Input";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { AIScoreBadge, AIScoreCircular } from "../components/ui/AIScoreBadge";
import { Skeleton } from "../components/ui/Skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/Table";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "../components/ui/Modal";

export default function UIKit() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 space-y-16">
      <h1 className="text-3xl font-bold text-(--color-brand-blue)">
        AetherHire — UI Kit
      </h1>

      {/* BUTTONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* BADGES */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Hired</Badge>
          <Badge variant="warning">In Review</Badge>
          <Badge variant="error">Rejected</Badge>
          <Badge variant="info">Applied</Badge>
          <Badge variant="purple">AI Matched</Badge>
        </div>
      </section>

      {/* INPUTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" placeholder="john@example.com" type="email" />
          <Input
            label="With Error"
            placeholder="Enter value"
            error="This field is required"
          />
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>
      </section>

      {/* CARDS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Basic Card</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                This is a basic card with header and content.
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader>
              <h3 className="font-semibold">Hover Card</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Hover over this card to see the effect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-gray-500 text-sm">Card without header.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI SCORE */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">AI Score Badges</h2>
        <div className="flex flex-wrap items-center gap-6">
          <AIScoreBadge score={92} />
          <AIScoreBadge score={74} />
          <AIScoreBadge score={45} />
          <AIScoreBadge score={20} />
          <AIScoreBadge score={88} showLabel />
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          <AIScoreCircular score={92} />
          <AIScoreCircular score={74} />
          <AIScoreCircular score={45} />
        </div>
      </section>

      {/* SKELETON */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Skeletons</h2>
        <div className="space-y-3 max-w-md">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </section>

      {/* TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Table</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>AI Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Sara Ahmed</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>
                  <Badge variant="success">Hired</Badge>
                </TableCell>
                <TableCell>
                  <AIScoreBadge score={92} size="sm" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Smith</TableCell>
                <TableCell>UI Designer</TableCell>
                <TableCell>
                  <Badge variant="warning">In Review</Badge>
                </TableCell>
                <TableCell>
                  <AIScoreBadge score={74} size="sm" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mona Hassan</TableCell>
                <TableCell>Data Analyst</TableCell>
                <TableCell>
                  <Badge variant="error">Rejected</Badge>
                </TableCell>
                <TableCell>
                  <AIScoreBadge score={35} size="sm" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* MODAL */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Modal</h2>
        <Modal>
          <ModalTrigger asChild>
            <Button variant="primary">Open Modal</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Confirm Action</ModalTitle>
              <ModalDescription>
                Are you sure you want to move this candidate to the next stage?
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
    </div>
  );
}
