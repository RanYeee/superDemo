//
//  FormViewCell.h
//  test
//
//  Created by Ducky on 15/12/14.
//  Copyright © 2015年 kinglian. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface FormViewCell : UITableViewCell
@property (strong, nonatomic) IBOutlet UILabel *dateLabel;
@property (strong, nonatomic) IBOutlet UILabel *timeLabel;
@property (strong, nonatomic) IBOutlet UILabel *highPreLabel;
@property (strong, nonatomic) IBOutlet UILabel *lowPreLabel;
@property (strong, nonatomic) IBOutlet UILabel *pulseLabel;

@end
