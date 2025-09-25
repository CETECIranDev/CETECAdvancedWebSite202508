// components/ProductCard.tsx (Final "Rotating Light" Version)
import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type IconName = keyof typeof Icons;

interface ProductCardProps {
    title: string;
    description: string;
    icon: IconName;
    link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, icon, link }) => {
    const IconComponent = Icons[icon] as React.ElementType;

    return (
        // The main container with the custom class for the CSS animation
        <div className="neon-border-card group w-full h-full rounded-2xl">
            {/* The link wraps the content, making the inner card clickable */}
            <Link href={link} className="relative z-10 flex flex-col items-center text-center h-full bg-card p-8 rounded-[15px] transition-transform duration-300 group-hover:-translate-y-2">
                {/* Icon */}
                <div className="bg-primary/10 p-4 rounded-full">
                    {IconComponent && <IconComponent className="h-10 w-10 text-primary" />}
                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-bold text-foreground">
                    {title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-muted-foreground flex-grow">
                    {description}
                </p>

                {/* "View Details" Link */}
                <div className="mt-6 flex items-center gap-2 font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>مشاهده جزئیات</span>
                    <ArrowRight size={18} />
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;