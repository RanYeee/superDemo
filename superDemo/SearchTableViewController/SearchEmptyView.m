//
//  SearchEmptyView.m
//
//  Code generated using QuartzCode 1.57.0 on 2017/8/13.
//  www.quartzcodeapp.com
//

#import "SearchEmptyView.h"
#import "QCMethod.h"

@interface SearchEmptyView ()

@property (nonatomic, strong) NSMutableDictionary * layers;
@property (nonatomic, strong) NSMapTable * completionBlocks;
@property (nonatomic, assign) BOOL  updateLayerValueForCompletedAnimation;


@end

@implementation SearchEmptyView

#pragma mark - Life Cycle

- (instancetype)initWithFrame:(CGRect)frame
{
	self = [super initWithFrame:frame];
	if (self) {
		[self setupProperties];
		[self setupLayers];
	}
	return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder
{
	self = [super initWithCoder:coder];
	if (self) {
		[self setupProperties];
		[self setupLayers];
	}
	return self;
}



- (void)setupProperties{
	self.completionBlocks = [NSMapTable mapTableWithKeyOptions:NSPointerFunctionsOpaqueMemory valueOptions:NSPointerFunctionsStrongMemory];;
	self.layers = [NSMutableDictionary dictionary];
	
}

- (void)setupLayers{
	CAShapeLayer * path = [CAShapeLayer layer];
	path.frame = CGRectMake(0, 100, 0, 0);
	path.path = [self pathPath].CGPath;
	[self.layer addSublayer:path];
	self.layers[@"path"] = path;
	
	CALayer * emptyBox = [CALayer layer];
	emptyBox.frame = CGRectMake(25, 44.86, 50, 29.14);
	[self.layer addSublayer:emptyBox];
	self.layers[@"emptyBox"] = emptyBox;
	
	CALayer * empty = [CALayer layer];
	empty.frame = CGRectMake(25, 36.01, 50, 14.99);
	[self.layer addSublayer:empty];
	self.layers[@"empty"] = empty;
	
	[self resetLayerPropertiesForLayerIdentifiers:nil];
}

- (void)resetLayerPropertiesForLayerIdentifiers:(NSArray *)layerIds{
	[CATransaction begin];
	[CATransaction setDisableActions:YES];
	
	if(!layerIds || [layerIds containsObject:@"path"]){
		CAShapeLayer * path = self.layers[@"path"];
		path.fillColor   = nil;
		path.strokeColor = [UIColor blackColor].CGColor;
	}
	if(!layerIds || [layerIds containsObject:@"emptyBox"]){
		CALayer * emptyBox = self.layers[@"emptyBox"];
		emptyBox.contents = (id)[UIImage imageNamed:@"emptyBox"].CGImage;
	}
	if(!layerIds || [layerIds containsObject:@"empty"]){
		CALayer * empty = self.layers[@"empty"];
		empty.contents = (id)[UIImage imageNamed:@"empty"].CGImage;
	}
	
	[CATransaction commit];
}

#pragma mark - Animation Setup

- (void)addUntitled1Animation{
	[self addUntitled1AnimationCompletionBlock:nil];
}

- (void)addUntitled1AnimationCompletionBlock:(void (^)(BOOL finished))completionBlock{
	if (completionBlock){
		CABasicAnimation * completionAnim = [CABasicAnimation animationWithKeyPath:@"completionAnim"];;
		completionAnim.duration = 1.689;
		completionAnim.delegate = self;
		[completionAnim setValue:@"Untitled1" forKey:@"animId"];
		[completionAnim setValue:@(NO) forKey:@"needEndAnim"];
		[self.layer addAnimation:completionAnim forKey:@"Untitled1"];
		[self.completionBlocks setObject:completionBlock forKey:[self.layer animationForKey:@"Untitled1"]];
	}
	
	NSString * fillMode = kCAFillModeForwards;
	
	////EmptyBox animation
	CABasicAnimation * emptyBoxBoundsAnim = [CABasicAnimation animationWithKeyPath:@"bounds"];
	emptyBoxBoundsAnim.fromValue          = [NSValue valueWithCGRect:CGRectMake(0, 0, 0, 0)];
	emptyBoxBoundsAnim.toValue            = [NSValue valueWithCGRect:CGRectMake(0, 0, 50, 29)];
	emptyBoxBoundsAnim.duration           = 1.09;
	emptyBoxBoundsAnim.timingFunction     = [CAMediaTimingFunction functionWithControlPoints:0.42 :0 :0.0106 :1.65];
	
	CAAnimationGroup * emptyBoxUntitled1Anim = [QCMethod groupAnimations:@[emptyBoxBoundsAnim] fillMode:fillMode];
	[self.layers[@"emptyBox"] addAnimation:emptyBoxUntitled1Anim forKey:@"emptyBoxUntitled1Anim"];
	
	////Empty animation
	CAKeyframeAnimation * emptyHiddenAnim = [CAKeyframeAnimation animationWithKeyPath:@"hidden"];
	emptyHiddenAnim.values                = @[@YES, @NO];
	emptyHiddenAnim.keyTimes              = @[@0, @1];
	emptyHiddenAnim.duration              = 1.69;
	emptyHiddenAnim.timingFunction        = [CAMediaTimingFunction functionWithControlPoints:0 :0 :0.745 :1.71];
	
	CAKeyframeAnimation * emptyTransformAnim = [CAKeyframeAnimation animationWithKeyPath:@"transform"];
	emptyTransformAnim.values         = @[[NSValue valueWithCATransform3D:CATransform3DMakeScale(0, 0, 0)], 
		 [NSValue valueWithCATransform3D:CATransform3DMakeTranslation(0, -10, 0)]];
	emptyTransformAnim.keyTimes       = @[@0, @1];
	emptyTransformAnim.duration       = 1.2;
	emptyTransformAnim.beginTime      = 0.0948;
	emptyTransformAnim.timingFunction = [CAMediaTimingFunction functionWithControlPoints:0.48 :-0.0666 :0.551 :1.63];
	
	CAAnimationGroup * emptyUntitled1Anim = [QCMethod groupAnimations:@[emptyHiddenAnim, emptyTransformAnim] fillMode:fillMode];
	[self.layers[@"empty"] addAnimation:emptyUntitled1Anim forKey:@"emptyUntitled1Anim"];
}

#pragma mark - Animation Cleanup

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag{
	void (^completionBlock)(BOOL) = [self.completionBlocks objectForKey:anim];;
	if (completionBlock){
		[self.completionBlocks removeObjectForKey:anim];
		if ((flag && self.updateLayerValueForCompletedAnimation) || [[anim valueForKey:@"needEndAnim"] boolValue]){
			[self updateLayerValuesForAnimationId:[anim valueForKey:@"animId"]];
			[self removeAnimationsForAnimationId:[anim valueForKey:@"animId"]];
		}
		completionBlock(flag);
	}
}

- (void)updateLayerValuesForAnimationId:(NSString *)identifier{
	if([identifier isEqualToString:@"Untitled1"]){
		[QCMethod updateValueFromPresentationLayerForAnimation:[self.layers[@"emptyBox"] animationForKey:@"emptyBoxUntitled1Anim"] theLayer:self.layers[@"emptyBox"]];
		[QCMethod updateValueFromPresentationLayerForAnimation:[self.layers[@"empty"] animationForKey:@"emptyUntitled1Anim"] theLayer:self.layers[@"empty"]];
	}
}

- (void)removeAnimationsForAnimationId:(NSString *)identifier{
	if([identifier isEqualToString:@"Untitled1"]){
		[self.layers[@"emptyBox"] removeAnimationForKey:@"emptyBoxUntitled1Anim"];
		[self.layers[@"empty"] removeAnimationForKey:@"emptyUntitled1Anim"];
	}
}

- (void)removeAllAnimations{
	[self.layers enumerateKeysAndObjectsUsingBlock:^(id key, CALayer *layer, BOOL *stop) {
		[layer removeAllAnimations];
	}];
}

#pragma mark - Bezier Path

- (UIBezierPath*)pathPath{
	
	
	return nil;
}


@end
