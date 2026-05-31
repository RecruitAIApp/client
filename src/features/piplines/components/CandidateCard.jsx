import { MoreVertical, Mail, Phone, Calendar, AlertTriangle, Eye, Star } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

function CandidateCard({candidateDate}) {
  const {name, role , email, phone, appliedAt, score, location, experience , isStarred, redFlags, initials} = candidateDate || {};

  const getScoreStyles = (scoreVal) => {
    const s = Number(scoreVal || 79);
    if (s < 50) {
      return "bg-orange-50 text-orange-600 border-orange-100";
    }
    if (s <= 70) {
      return "bg-amber-50 text-amber-600 border-amber-100";
    }
    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  return (
    <div className='bg-white rounded-lg border border-gray-100 p-4  shadow-sm hover:shadow-md transition-all relative'>
      {/* Header */}
      <div className='flex justify-between items-start mb-3 gap-2'>
        <div className='flex gap-3 items-center min-w-0'>
         <div className='w-10 h-10 shrink-0 bg-linear-to-br from-(--color-brand-blue) to-(--color-brand-teal)  rounded-full text-white flex items-center justify-center font-medium text-sm '>
           {initials || 'AN'}
         </div>
         <div className='min-w-0'>
          <h4 className='font-semibold text-gray-900 flex items-center gap-1 text-sm'>
            {name || 'Ahmed Nabil'}
            {isStarred && <Star className='w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0' />}
          </h4>
          <p className='font-medium text-gray-400 text-sm'>
            {role || 'Software Engineer'}
            </p>
         </div>
        </div>

        {/*AI match Score */}
        <span className={`font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 border text-xs shrink-0 ${getScoreStyles(score)}`}>
           <Star className="w-3 h-3 fill-current" />
           {score ? `${score}%` : '79%'}
        </span>
      </div>

      {redFlags && (
        <div className="mb-4 bg-red-50 border border-red-100 rounded-lg p-2.5 flex gap-2 items-start text-xs text-red-600 animate-pulse">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Red Flags</span>
            <span className="text-gray-600">{redFlags}</span>
          </div>
        </div>
      )}
      {/* Contact Info */}
      <div className='space-y-1.5 text-xs text-gray-500 font-medium mb-4 mt-2'>
        <div className='flex items-center gap-2'>
          <Mail className="w-3.5 h-3.5 text-gray-400" /> <span>{email || 'example@gmail.com'}</span>
        </div>
         <div className='flex items-center gap-2'>
          <Phone className="w-3.5 h-3.5 text-gray-400" /> <span>{phone || '+201034567890'}</span>
        </div>
         <div className='flex items-center gap-2'>
          <Calendar className="w-3.5 h-3.5 text-gray-400" /> <span>{appliedAt ? (isNaN(Date.parse(appliedAt)) ? appliedAt : `Applied ${new Date(appliedAt).toLocaleDateString()}`) : 'Applied 2026-05-01'}</span>
        </div>
      </div>

      {/*badges */}
      <div className="flex gap-2 flex-wrap mb-4">
        <span className="bg-blue-50 text-blue-600 border border-blue-500 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          {experience ? `${experience} years` : '2 years'}
        </span>
        <span className="bg-gray-100 text-gray-600 border border-gray-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          {location || 'Cairo'}
        </span>
      </div>

      {/*actions*/}
      <div className='flex justify-between items-center pt-2 gap-2'>
        <button className='flex-1 border border-blue-900 cursor-pointer text-blue-900 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5'>
          <Eye className="w-3.5 h-3.5" /> View
        </button>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer shrink-0">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
export default CandidateCard;